const crypto = require("crypto");
const Payment = require("../models/Payment");
const AppError = require("../utils/AppError");
const razorpayService = require("./razorpayService");
const membershipService = require("./membershipService");
const paymentRepository = require("../repositories/paymentRepository");
const membershipConfigRepository = require("../repositories/membershipConfigRepository");

const PAYMENT_SESSION_TTL_MINUTES = 30;

const getClientContext = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get("user-agent"),
});

const generateOrderId = () => {
  const suffix = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `MTTF_${Date.now()}_${suffix}`;
};

const mapGatewayStatus = (rawStatus, eventType) => {
  const status = String(rawStatus || eventType || "").toUpperCase();

  if (["SUCCESS", "PAID", "PAYMENT_SUCCESS", "CAPTURED"].some((key) => status.includes(key))) {
    return "SUCCESS";
  }
  if (["REFUND", "REFUNDED"].some((key) => status.includes(key))) {
    return "REFUNDED";
  }
  if (["CANCEL", "USER_DROPPED", "TERMINATED"].some((key) => status.includes(key))) {
    return "CANCELLED";
  }
  if (["FAILED", "EXPIRED", "FLAGGED", "VOID"].some((key) => status.includes(key))) {
    return "FAILED";
  }

  return "PENDING";
};

const getFrontendUrl = () => process.env.FRONTEND_URL || "http://localhost:5173";

const getWebhookUrl = () => (
  process.env.RAZORPAY_WEBHOOK_URL ||
  (process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/payments/webhook` : undefined)
);

const redactGatewayResponse = (response) => {
  if (!response || typeof response !== "object") {
    return response;
  }
  // Nothing sensitive to strip from Razorpay order objects,
  // but keep the helper for structural consistency.
  return { ...response };
};

const getPublicMembershipConfig = async () => {
  const prices = await membershipConfigRepository.getPriceMap();
  return {
    prices,
    currency: "INR",
  };
};

const createPaymentOrder = async ({ user, req }) => {
  const context = getClientContext(req);

  if (user.isMembershipPaid) {
    throw new AppError(409, "Membership is already active.");
  }

  const reusablePayment = await paymentRepository.findReusablePendingPayment(user._id);
  if (reusablePayment?.paymentSessionId) {
    await paymentRepository.appendAuditLog(reusablePayment.orderId, {
      event: "ORDER_REUSED",
      status: "PENDING",
      message: "Reusable pending payment order returned to user.",
      ...context,
    });

    return {
      orderId: reusablePayment.orderId,
      razorpayOrderId: reusablePayment.paymentSessionId,   // stored in paymentSessionId field
      razorpayKeyId: razorpayService.getRazorpayConfig().keyId,
      amount: reusablePayment.amount,
      currency: reusablePayment.currency,
      membershipType: reusablePayment.membershipType,
      paymentStatus: reusablePayment.paymentStatus,
      razorpayEnvironment: razorpayService.getRazorpayConfig().environment,
    };
  }

  const membershipType = user.membershipType || "individual";
  const config = await membershipConfigRepository.getActiveConfig(membershipType);
  if (!config) {
    throw new AppError(400, "Membership pricing is not active for this user type.");
  }

  const orderId = generateOrderId();
  const payment = await paymentRepository.createPayment({
    orderId,
    userId: user._id,
    userName: user.name,
    userEmail: user.email,
    amount: config.amount,
    currency: config.currency,
    membershipType,
    paymentStatus: "PENDING",
    expiresAt: new Date(Date.now() + PAYMENT_SESSION_TTL_MINUTES * 60 * 1000),
    auditLogs: [{
      event: "ORDER_CREATED",
      status: "PENDING",
      message: "Backend-created payment order initialized.",
      ...context,
      metadata: { amount: config.amount, currency: config.currency, membershipType },
    }],
  });

  try {
    const razorpayOrder = await razorpayService.createOrder({
      orderId,
      amount: config.amount,
      currency: config.currency,
      user,
    });

    if (!razorpayOrder.id) {
      throw new AppError(502, "Razorpay did not return an order id.");
    }

    await paymentRepository.updatePayment(orderId, {
      // We re-use the paymentSessionId field to store razorpay order id
      // so the DB schema and repository layer stay unchanged.
      paymentSessionId: razorpayOrder.id,
      gatewayOrderStatus: razorpayOrder.status,
      gatewayResponse: redactGatewayResponse(razorpayOrder),
      $push: {
        auditLogs: {
          event: "RAZORPAY_ORDER_CREATED",
          status: razorpayOrder.status || "created",
          message: "Razorpay order created successfully.",
          ...context,
          metadata: { razorpayOrderId: razorpayOrder.id, receipt: razorpayOrder.receipt },
        },
      },
    });

    return {
      orderId,
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: razorpayService.getRazorpayConfig().keyId,
      amount: config.amount,
      currency: config.currency,
      membershipType,
      paymentStatus: payment.paymentStatus,
      razorpayEnvironment: razorpayService.getRazorpayConfig().environment,
    };
  } catch (error) {
    await paymentRepository.updatePayment(orderId, {
      paymentStatus: "FAILED",
      $push: {
        auditLogs: {
          event: "RAZORPAY_ORDER_FAILED",
          status: "FAILED",
          message: error.message,
          ...context,
        },
      },
    });
    throw error;
  }
};

const getOwnedPayment = async ({ orderId, user }) => {
  if (!/^MTTF_[A-Za-z0-9_]+$/.test(orderId || "")) {
    throw new AppError(400, "Invalid order id.");
  }

  const payment = await paymentRepository.findByOrderId(orderId);
  if (!payment || String(payment.userId) !== String(user._id)) {
    throw new AppError(404, "Payment not found.");
  }

  return payment;
};

const toClientPayment = (payment, user) => ({
  orderId: payment.orderId,
  amount: payment.amount,
  currency: payment.currency,
  paymentGateway: payment.paymentGateway,
  paymentStatus: payment.paymentStatus,
  paymentMethod: payment.paymentMethod,
  membershipType: payment.membershipType,
  webhookVerified: payment.webhookVerified,
  gatewayPaymentId: payment.gatewayPaymentId,
  isMembershipPaid: Boolean(user?.isMembershipPaid),
  membershipId: user?.membershipId,
  membershipActivatedAt: user?.membershipActivatedAt,
  createdAt: payment.createdAt,
  updatedAt: payment.updatedAt,
});

const getPaymentStatus = async ({ orderId, user }) => {
  const payment = await getOwnedPayment({ orderId, user });
  return toClientPayment(payment, user);
};

const getPaymentHistory = async ({ user }) => {
  const payments = await paymentRepository.listUserPayments(user._id);
  return payments.map((payment) => toClientPayment(payment, user));
};

const pickLatestGatewayPayment = (payments) => {
  if (!Array.isArray(payments)) {
    return null;
  }
  return payments
    .slice()
    .sort((a, b) => new Date(b.payment_time || b.created_at || 0) - new Date(a.payment_time || a.created_at || 0))[0];
};

const verifyPaymentWithGateway = async ({ orderId, user, req }) => {
  const context = getClientContext(req);
  const payment = await getOwnedPayment({ orderId, user });

  // paymentSessionId stores the Razorpay order id (e.g. "order_XXXXXXXXX").
  const razorpayOrderId = payment.paymentSessionId || orderId;

  const [razorpayOrder, razorpayPayments] = await Promise.all([
    razorpayService.fetchOrder(razorpayOrderId),
    razorpayService.fetchOrderPayments(razorpayOrderId),
  ]);

  const latestPayment = pickLatestGatewayPayment(razorpayPayments);

  // Razorpay payment statuses: "captured" = success, "failed" = failed.
  const rawStatus = latestPayment?.status || razorpayOrder?.status;
  const gatewayStatus = mapGatewayStatus(rawStatus, rawStatus);

  // Razorpay amounts are in paise; convert back to rupees for comparison.
  const gatewayAmountPaise = Number(latestPayment?.amount || razorpayOrder?.amount || (process.env.RAZORPAY_MOCK_MODE === 'true' ? Number(payment.amount) * 100 : 0));
  const gatewayAmount = gatewayAmountPaise / 100;
  const amountMatches = Math.round(gatewayAmount) === Math.round(Number(payment.amount));
  const nextStatus = amountMatches ? gatewayStatus : "FAILED";

  const update = {
    gatewayOrderStatus: razorpayOrder?.status,
    paymentStatus: nextStatus,
    gatewayPaymentId: latestPayment?.id || payment.gatewayPaymentId,
    paymentMethod: latestPayment?.method || payment.paymentMethod,
    gatewayResponse: {
      order: redactGatewayResponse(razorpayOrder),
      latestPayment: redactGatewayResponse(latestPayment),
    },
    $push: {
      auditLogs: {
        event: "CLIENT_VERIFY",
        status: nextStatus,
        message: amountMatches
          ? "Client-requested Razorpay status sync completed."
          : "Razorpay amount mismatch during client-requested verification.",
        ...context,
        metadata: { gatewayAmount },
      },
    },
  };

  const updatedPayment = await paymentRepository.updatePayment(orderId, update);

  if (nextStatus === "SUCCESS" && !payment.webhookVerified) {
    try {
      await membershipService.activateMembershipForPayment({
        payment: updatedPayment,
        ...context,
      });
      const freshUser = await require("../models/User").findById(user._id);
      return toClientPayment(updatedPayment, freshUser);
    } catch (activationError) {
      await paymentRepository.appendAuditLog(orderId, {
        event: "MEMBERSHIP_ACTIVATION_ERROR",
        status: "SUCCESS",
        message: "Payment verified but membership activation failed during client verify.",
        ...context,
        metadata: { error: activationError.message },
      });
    }
  }

  return toClientPayment(updatedPayment, user);
};

// Razorpay webhook body shape:
// body.event         → e.g. "payment.captured", "payment.failed"
// body.payload.payment.entity → the payment object
// body.payload.order.entity   → the order object
const extractWebhookData = (body) => {
  const paymentEntity = body?.payload?.payment?.entity || {};
  const orderEntity   = body?.payload?.order?.entity   || {};

  // orderId stored in Razorpay order receipt = our internal MTTF_xxx id
  const receipt = orderEntity?.receipt || paymentEntity?.order_id || "";

  // Razorpay amounts are in paise; convert to rupees for comparison.
  const amountPaise = Number(
    paymentEntity?.amount ||
    orderEntity?.amount ||
    0
  );

  return {
    eventType:          body?.event,
    // receipt is our internal orderId stored at creation time
    receipt:            receipt,
    // Razorpay order id ("order_XXXXXX") used to cross-reference paymentSessionId in DB
    razorpayOrderId:    paymentEntity?.order_id || orderEntity?.id,
    gatewayOrderStatus: orderEntity?.status,
    gatewayAmount:      amountPaise / 100,       // back to rupees
    gatewayCurrency:    paymentEntity?.currency || orderEntity?.currency || "INR",
    gatewayPaymentId:   paymentEntity?.id,
    gatewayPaymentStatus: paymentEntity?.status, // "captured", "failed"
    paymentMethod:      paymentEntity?.method,
    // Use Razorpay payment id as idempotency key (unique per payment attempt)
    eventId:            paymentEntity?.id || body?.event_id,
  };
};

const handleRazorpayWebhook = async ({ req }) => {
  const context = getClientContext(req);
  const signature = req.get("x-razorpay-signature");
  const rawBody = req.rawBody;

  if (!razorpayService.verifyWebhookSignature({ rawBody, signature })) {
    throw new AppError(401, "Invalid Razorpay webhook signature.");
  }

  const webhook = extractWebhookData(req.body);

  // Look up payment record by:
  // 1. receipt (our internal MTTF_xxx orderId, stored at Razorpay order creation)
  // 2. Fallback: match paymentSessionId field which stores razorpayOrderId
  
  if (webhook.receipt && /^DONATE_/.test(webhook.receipt)) {
    const donationService = require("./donationService");
    return await donationService.handleRazorpayWebhook({ req });
  }

  let payment = null;
  if (webhook.receipt && /^MTTF_/.test(webhook.receipt)) {
    payment = await paymentRepository.findByOrderId(webhook.receipt, true);
  }
  if (!payment && webhook.razorpayOrderId) {
    payment = await require("../models/Payment").findOne(
      { paymentSessionId: webhook.razorpayOrderId },
    ).select("+paymentSessionId +processedWebhookKeys +gatewayResponse");
  }

  if (!payment) {
    throw new AppError(404, "Webhook payment record not found.");
  }

  const webhookKey = webhook.eventId ||
    crypto.createHash("sha256").update(rawBody || JSON.stringify(req.body)).digest("hex");

  if (payment.processedWebhookKeys.includes(webhookKey)) {
    await paymentRepository.appendAuditLog(payment.orderId, {
      event: "WEBHOOK_DUPLICATE",
      status: payment.paymentStatus,
      message: "Duplicate Razorpay webhook ignored.",
      ...context,
      metadata: { webhookKey },
    });
    return { duplicate: true, paymentStatus: payment.paymentStatus };
  }

  const amountMatches = Math.round(Number(webhook.gatewayAmount)) === Math.round(Number(payment.amount));
  const currencyMatches = String(webhook.gatewayCurrency || "INR").toUpperCase() === payment.currency;
  const mappedStatus = mapGatewayStatus(webhook.gatewayPaymentStatus || webhook.gatewayOrderStatus, webhook.eventType);
  const nextStatus = amountMatches && currencyMatches ? mappedStatus : "FAILED";

  const updatedPayment = await paymentRepository.updatePayment(payment.orderId, {
    paymentStatus: nextStatus,
    webhookVerified: true,
    gatewayPaymentId: webhook.gatewayPaymentId || payment.gatewayPaymentId,
    gatewayOrderStatus: webhook.gatewayOrderStatus || payment.gatewayOrderStatus,
    paymentMethod: webhook.paymentMethod || payment.paymentMethod,
    $addToSet: { processedWebhookKeys: webhookKey },
    $push: {
      auditLogs: {
        event: "WEBHOOK_RECEIVED",
        status: nextStatus,
        message: amountMatches && currencyMatches
          ? "Signed Razorpay webhook processed."
          : "Signed Razorpay webhook rejected due to amount or currency mismatch.",
        ...context,
        metadata: {
          eventType: webhook.eventType,
          gatewayPaymentId: webhook.gatewayPaymentId,
          gatewayAmount: webhook.gatewayAmount,
          gatewayCurrency: webhook.gatewayCurrency,
          expectedAmount: payment.amount,
          expectedCurrency: payment.currency,
        },
      },
    },
  });

  if (nextStatus === "SUCCESS") {
    await membershipService.activateMembershipForPayment({
      payment: updatedPayment,
      ...context,
    });
  }

  return { duplicate: false, paymentStatus: nextStatus };
};

// Backward-compat alias so paymentController.js import still works.
const handleCashfreeWebhook = handleRazorpayWebhook;

module.exports = {
  getPublicMembershipConfig,
  createPaymentOrder,
  getPaymentStatus,
  getPaymentHistory,
  verifyPaymentWithGateway,
  handleRazorpayWebhook,
  handleCashfreeWebhook,  // alias kept for backward compatibility
};
