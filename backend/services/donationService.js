const crypto = require("crypto");
const AppError = require("../utils/AppError");
const razorpayService = require("./razorpayService");
const donationRepository = require("../repositories/donationRepository");
const certificateService = require("./certificateService");
const emailService = require("./emailService");
const Donation = require("../models/Donation");

const PAYMENT_SESSION_TTL_MINUTES = 30;
const MIN_DONATION = 100;
const MAX_DONATION = 10000000;

const VALID_PURPOSES = Donation.purposes;

const getClientContext = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get("user-agent"),
});

const generateOrderId = () => {
  const suffix = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `DONATE_${Date.now()}_${suffix}`;
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

const redactGatewayResponse = (response) => {
  if (!response || typeof response !== "object") {
    return response;
  }
  return { ...response };
};

const validateDonorInput = ({ donorName, donorEmail, donorPhone, amount, purpose, pan, address, message }) => {
  if (!donorName?.trim() || donorName.trim().length < 2) {
    throw new AppError(400, "Full name is required (minimum 2 characters).");
  }
  if (!donorEmail?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
    throw new AppError(400, "A valid email address is required.");
  }
  const phoneDigits = String(donorPhone || "").replace(/\D/g, "");
  if (!phoneDigits || !/^[6-9]\d{9}$/.test(phoneDigits)) {
    throw new AppError(400, "A valid 10-digit Indian phone number is required.");
  }
  const parsedAmount = Number(amount);
  if (!parsedAmount || parsedAmount < MIN_DONATION || parsedAmount > MAX_DONATION) {
    throw new AppError(400, `Donation amount must be between ₹${MIN_DONATION} and ₹${MAX_DONATION.toLocaleString("en-IN")}.`);
  }
  if (purpose && !VALID_PURPOSES.includes(purpose)) {
    throw new AppError(400, "Invalid donation purpose.");
  }
  if (pan?.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(pan.trim())) {
    throw new AppError(400, "Invalid PAN format.");
  }
  return {
    donorName: donorName.trim().slice(0, 120),
    donorEmail: donorEmail.trim().toLowerCase().slice(0, 160),
    donorPhone: phoneDigits,
    amount: parsedAmount,
    purpose: purpose || "general",
    pan: pan?.trim().toUpperCase().slice(0, 10) || undefined,
    address: address?.trim().slice(0, 300) || undefined,
    message: message?.trim().slice(0, 500) || undefined,
  };
};

const toClientDonation = (donation) => ({
  orderId: donation.orderId,
  donorName: donation.donorName,
  donorEmail: donation.donorEmail,
  donorPhone: donation.donorPhone,
  amount: donation.amount,
  currency: donation.currency,
  purpose: donation.purpose,
  paymentStatus: donation.paymentStatus,
  paymentMethod: donation.paymentMethod,
  gatewayPaymentId: donation.gatewayPaymentId,
  paymentTime: donation.paymentTime,
  certificateId: donation.certificateId,
  certificateGeneratedAt: donation.certificateGeneratedAt,
  certificateEmailedAt: donation.certificateEmailedAt,
  webhookVerified: donation.webhookVerified,
  createdAt: donation.createdAt,
  updatedAt: donation.updatedAt,
});

const extractPaymentTime = (latestPayment) => {
  const raw = latestPayment?.payment_time || latestPayment?.payment_completion_time || latestPayment?.created_at;
  if (!raw) return new Date();
  
  // If raw is a number, Razorpay created_at is in seconds.
  const time = typeof raw === "number" ? raw * 1000 : raw;
  const parsed = new Date(time);
  
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const buildPaymentUpdate = ({ donation, latestPayment, razorpayOrder, nextStatus, context, gatewayAmount }) => ({
  gatewayOrderStatus: razorpayOrder?.status,
  paymentStatus: nextStatus,
  gatewayPaymentId: latestPayment?.id || donation.gatewayPaymentId,
  paymentMethod: latestPayment?.method || donation.paymentMethod,
  ...(nextStatus === "SUCCESS" ? { paymentTime: extractPaymentTime(latestPayment) } : {}),
  gatewayResponse: {
    order: redactGatewayResponse(razorpayOrder),
    latestPayment: redactGatewayResponse(latestPayment),
  },
  $push: {
    auditLogs: {
      event: "CLIENT_VERIFY",
      status: nextStatus,
      message: gatewayAmount === Number(donation.amount)
        ? "Client-requested donation status sync completed."
        : "Gateway amount mismatch during donation verification.",
      ...context,
      metadata: { gatewayAmount },
    },
  },
});

const processSuccessfulDonation = async ({ donation, context }) => {
  if (donation.certificateId) {
    return donation;
  }

  const { certificateId, filePath } = await certificateService.generateDonationCertificate(donation);

  const updated = await donationRepository.updateDonation(donation.orderId, {
    certificateId,
    certificatePath: filePath,
    certificateGeneratedAt: new Date(),
    $push: {
      auditLogs: {
        event: "CERTIFICATE_GENERATED",
        status: "SUCCESS",
        message: "Donation certificate PDF generated.",
        ...context,
        metadata: { certificateId },
      },
    },
  });

  try {
    const emailResult = await emailService.sendDonationCertificate({
      donation: updated,
      certificatePath: filePath,
    });

    if (emailResult.sent) {
      await donationRepository.updateDonation(donation.orderId, {
        certificateEmailedAt: new Date(),
        $push: {
          auditLogs: {
            event: "CERTIFICATE_EMAILED",
            status: "SUCCESS",
            message: "Donation certificate emailed to donor.",
            ...context,
          },
        },
      });
    }
  } catch (emailError) {
    await donationRepository.appendAuditLog(donation.orderId, {
      event: "CERTIFICATE_EMAIL_FAILED",
      status: "SUCCESS",
      message: emailError.message,
      ...context,
    });
  }

  return donationRepository.findByOrderId(donation.orderId, true);
};

const createDonationOrder = async ({ body, req }) => {
  const context = getClientContext(req);
  const validated = validateDonorInput(body);

  const reusable = await donationRepository.findReusablePending(validated.donorEmail, validated.amount);
  if (reusable?.paymentSessionId) {
    await donationRepository.appendAuditLog(reusable.orderId, {
      event: "ORDER_REUSED",
      status: "PENDING",
      message: "Reusable pending donation session returned.",
      ...context,
    });

    return {
      orderId: reusable.orderId,
      razorpayOrderId: reusable.paymentSessionId,
      razorpayKeyId: razorpayService.getRazorpayConfig().keyId,
      amount: reusable.amount,
      currency: reusable.currency,
      paymentStatus: reusable.paymentStatus,
      razorpayEnvironment: razorpayService.getRazorpayConfig().environment,
    };
  }

  const orderId = generateOrderId();
  const donation = await donationRepository.createDonation({
    orderId,
    donorName: validated.donorName,
    donorEmail: validated.donorEmail,
    donorPhone: validated.donorPhone,
    pan: validated.pan,
    address: validated.address,
    purpose: validated.purpose,
    message: validated.message,
    amount: validated.amount,
    currency: "INR",
    paymentStatus: "PENDING",
    expiresAt: new Date(Date.now() + PAYMENT_SESSION_TTL_MINUTES * 60 * 1000),
    auditLogs: [{
      event: "ORDER_CREATED",
      status: "PENDING",
      message: "Donation order initialized.",
      ...context,
      metadata: { amount: validated.amount, purpose: validated.purpose },
    }],
  });

  try {
    const razorpayOrder = await razorpayService.createOrder({
      orderId,
      amount: validated.amount,
      currency: "INR",
      user: { name: validated.donorName, email: validated.donorEmail, membershipType: "donation" },
    });

    if (!razorpayOrder.id) {
      throw new AppError(502, "Razorpay did not return a payment session.");
    }

    await donationRepository.updateDonation(orderId, {
      paymentSessionId: razorpayOrder.id,
      gatewayOrderStatus: razorpayOrder.status,
      gatewayResponse: redactGatewayResponse(razorpayOrder),
      $push: {
        auditLogs: {
          event: "RAZORPAY_ORDER_CREATED",
          status: razorpayOrder.status || "PENDING",
          message: "Razorpay donation order created.",
          ...context,
        },
      },
    });

    return {
      orderId,
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: razorpayService.getRazorpayConfig().keyId,
      amount: validated.amount,
      currency: "INR",
      paymentStatus: donation.paymentStatus,
      razorpayEnvironment: razorpayService.getRazorpayConfig().environment,
    };
  } catch (error) {
    await donationRepository.updateDonation(orderId, {
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

const getDonationByOrderId = async (orderId) => {
  if (!/^DONATE_[A-Za-z0-9_]+$/.test(orderId || "")) {
    throw new AppError(400, "Invalid donation order id.");
  }
  const donation = await donationRepository.findByOrderId(orderId);
  if (!donation) {
    throw new AppError(404, "Donation not found.");
  }
  return donation;
};

const pickLatestGatewayPayment = (payments) => {
  if (!Array.isArray(payments)) return null;
  return payments
    .slice()
    .sort((a, b) => new Date(b.payment_time || b.created_at || 0) - new Date(a.payment_time || a.created_at || 0))[0];
};

const verifyDonationWithGateway = async ({ orderId, req }) => {
  const context = getClientContext(req);
  const donation = await getDonationByOrderId(orderId);
  const razorpayOrderId = donation.paymentSessionId || orderId;

  const [razorpayOrder, razorpayPayments] = await Promise.all([
    razorpayService.fetchOrder(razorpayOrderId),
    razorpayService.fetchOrderPayments(razorpayOrderId),
  ]);

  const latestPayment = pickLatestGatewayPayment(razorpayPayments);
  const gatewayStatus = mapGatewayStatus(
    latestPayment?.status || razorpayOrder?.status,
    latestPayment?.status
  );

  const gatewayAmount = Number(latestPayment?.amount || razorpayOrder?.amount || (donation.amount * 100)) / 100;
  const amountMatches = Math.round(gatewayAmount) === Math.round(Number(donation.amount));
  const nextStatus = amountMatches ? gatewayStatus : "FAILED";

  const updatedDonation = await donationRepository.updateDonation(orderId,
    buildPaymentUpdate({
      donation,
      latestPayment,
      razorpayOrder,
      nextStatus,
      context,
      gatewayAmount,
    })
  );

  if (nextStatus === "SUCCESS" && !updatedDonation.certificateId) {
    const processed = await processSuccessfulDonation({ donation: updatedDonation, context });
    return toClientDonation(processed);
  }

  return toClientDonation(updatedDonation);
};

const extractWebhookData = (body) => {
  const paymentEntity = body?.payload?.payment?.entity || {};
  const orderEntity   = body?.payload?.order?.entity   || {};

  const receipt = orderEntity?.receipt || paymentEntity?.order_id || "";
  const amountPaise = Number(
    paymentEntity?.amount ||
    orderEntity?.amount ||
    0
  );

  return {
    eventType:          body?.event,
    receipt:            receipt,
    razorpayOrderId:    paymentEntity?.order_id || orderEntity?.id,
    gatewayOrderStatus: orderEntity?.status,
    gatewayAmount:      amountPaise / 100,
    gatewayCurrency:    paymentEntity?.currency || orderEntity?.currency || "INR",
    gatewayPaymentId:   paymentEntity?.id,
    gatewayPaymentStatus: paymentEntity?.status,
    paymentMethod:      paymentEntity?.method,
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
  
  let donation = null;
  if (webhook.receipt && /^DONATE_/.test(webhook.receipt)) {
    donation = await donationRepository.findByOrderId(webhook.receipt, true);
  }
  if (!donation && webhook.razorpayOrderId) {
    donation = await require("../models/Donation").findOne(
      { paymentSessionId: webhook.razorpayOrderId },
    ).select("+paymentSessionId +processedWebhookKeys +gatewayResponse");
  }

  if (!donation) {
    throw new AppError(404, "Webhook donation record not found.");
  }

  const webhookKey = webhook.eventId ||
    crypto.createHash("sha256").update(rawBody || JSON.stringify(req.body)).digest("hex");

  if (donation.processedWebhookKeys.includes(webhookKey)) {
    await donationRepository.appendAuditLog(donation.orderId, {
      event: "WEBHOOK_DUPLICATE",
      status: donation.paymentStatus,
      message: "Duplicate donation webhook ignored.",
      ...context,
      metadata: { webhookKey },
    });
    return { duplicate: true, paymentStatus: donation.paymentStatus };
  }

  const amountMatches = Math.round(Number(webhook.gatewayAmount)) === Math.round(Number(donation.amount));
  const currencyMatches = String(webhook.gatewayCurrency || "INR").toUpperCase() === donation.currency;
  const mappedStatus = mapGatewayStatus(webhook.gatewayPaymentStatus || webhook.gatewayOrderStatus, webhook.eventType);
  const nextStatus = amountMatches && currencyMatches ? mappedStatus : "FAILED";

  const updatedDonation = await donationRepository.updateDonation(donation.orderId, {
    paymentStatus: nextStatus,
    webhookVerified: true,
    gatewayPaymentId: webhook.gatewayPaymentId || donation.gatewayPaymentId,
    gatewayOrderStatus: webhook.gatewayOrderStatus || donation.gatewayOrderStatus,
    paymentMethod: webhook.paymentMethod || donation.paymentMethod,
    ...(nextStatus === "SUCCESS" ? { paymentTime: new Date() } : {}),
    $addToSet: { processedWebhookKeys: webhookKey },
    $push: {
      auditLogs: {
        event: "WEBHOOK_RECEIVED",
        status: nextStatus,
        message: amountMatches && currencyMatches
          ? "Signed Razorpay donation webhook processed."
          : "Signed Razorpay donation webhook rejected due to amount mismatch.",
        ...context,
        metadata: {
          eventType: webhook.eventType,
          gatewayPaymentId: webhook.gatewayPaymentId,
          gatewayAmount: webhook.gatewayAmount,
          expectedAmount: donation.amount,
        },
      },
    },
  });

  if (nextStatus === "SUCCESS" && !updatedDonation.certificateId) {
    await processSuccessfulDonation({ donation: updatedDonation, context });
  }

  return { duplicate: false, paymentStatus: nextStatus };
};

const getCertificateDownload = async ({ orderId, email }) => {
  const donation = await getDonationByOrderId(orderId);

  if (donation.paymentStatus !== "SUCCESS") {
    throw new AppError(400, "Certificate is available only for successful donations.");
  }

  if (email && donation.donorEmail !== email.trim().toLowerCase()) {
    throw new AppError(403, "Email does not match donation record.");
  }

  if (!donation.certificateId) {
    throw new AppError(404, "Certificate has not been generated yet.");
  }

  const filePath = certificateService.getCertificatePath(donation.certificateId);
  if (!filePath) {
    throw new AppError(404, "Certificate file not found.");
  }

  return {
    filePath,
    fileName: `MTTF-Donation-Certificate-${donation.certificateId}.pdf`,
    donation: toClientDonation(donation),
  };
};

const isDonationOrderId = (orderId) => String(orderId || "").startsWith("DONATE_");

module.exports = {
  createDonationOrder,
  verifyDonationWithGateway,
  handleRazorpayWebhook,
  getDonationByOrderId,
  getCertificateDownload,
  isDonationOrderId,
  toClientDonation,
  VALID_PURPOSES,
  MIN_DONATION,
};
