/**
 * razorpayService.js
 *
 * Adapter Pattern: Drop-in replacement for cashfreeService.js.
 * Exports the same interface so paymentService.js requires zero
 * business-logic changes — only the import path changes.
 *
 * Exported interface:
 *   getRazorpayConfig()
 *   createOrder({ orderId, amount, currency, user })
 *   fetchOrder(razorpayOrderId)
 *   fetchOrderPayments(razorpayOrderId)
 *   verifyWebhookSignature({ rawBody, signature })
 */

const crypto = require("crypto");
const Razorpay = require("razorpay");
const AppError = require("../utils/AppError");

// ── Config ───────────────────────────────────────────────────────────────────

const getRazorpayConfig = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const env = (process.env.RAZORPAY_ENV || "test").toLowerCase();
  const isProduction = ["production", "prod", "live"].includes(env);

  return {
    keyId,
    keySecret,
    webhookSecret,
    environment: isProduction ? "production" : "test",
  };
};

const ensureConfigured = () => {
  const config = getRazorpayConfig();
  if (!config.keyId || !config.keySecret) {
    throw new AppError(503, "Razorpay credentials are not configured.");
  }
  return config;
};

const getRazorpayInstance = () => {
  const config = ensureConfigured();
  return new Razorpay({
    key_id: config.keyId,
    key_secret: config.keySecret,
  });
};

// ── Order Creation ────────────────────────────────────────────────────────────
// Razorpay amounts are in paise (smallest INR unit).
// DB stores amounts in rupees. Multiply by 100 before sending.

const createOrder = async ({ orderId, amount, currency, user }) => {
  if (process.env.RAZORPAY_MOCK_MODE === "true") {
    return {
      id: "order_mock_" + orderId,
      entity: "order",
      amount: Number(amount) * 100,
      amount_due: Number(amount) * 100,
      amount_paid: 0,
      currency: currency || "INR",
      receipt: orderId,
      status: "created",
      attempts: 0,
      _mock: true,
    };
  }

  const instance = getRazorpayInstance();
  const options = {
    amount: Math.round(Number(amount) * 100),
    currency: currency || "INR",
    receipt: orderId,
    notes: {
      mttf_order_id: orderId,
      customer_name: user.name,
      customer_email: user.email,
      membership_type: user.membershipType || "individual",
    },
  };

  try {
    const order = await instance.orders.create(options);
    return order;
  } catch (err) {
    throw new AppError(502, "Razorpay order creation failed.", {
      razorpayMessage: err.error && err.error.description ? err.error.description : err.message,
    });
  }
};

// ── Order Fetch ───────────────────────────────────────────────────────────────

const fetchOrder = async (razorpayOrderId) => {
  if (process.env.RAZORPAY_MOCK_MODE === "true") {
    return {
      id: razorpayOrderId,
      receipt: razorpayOrderId.replace("order_mock_", ""),
      status: "paid",
      currency: "INR",
    };
  }

  const instance = getRazorpayInstance();
  try {
    return await instance.orders.fetch(razorpayOrderId);
  } catch (err) {
    throw new AppError(502, "Failed to fetch Razorpay order.", {
      razorpayMessage: err.error && err.error.description ? err.error.description : err.message,
    });
  }
};

// ── Payments on an Order ──────────────────────────────────────────────────────

const fetchOrderPayments = async (razorpayOrderId) => {
  if (process.env.RAZORPAY_MOCK_MODE === "true") {
    return [
      {
        id: "pay_mock_" + Date.now(),
        entity: "payment",
        currency: "INR",
        status: "captured",
        method: "netbanking",
        captured: true,
        created_at: Math.floor(Date.now() / 1000),
      },
    ];
  }

  const instance = getRazorpayInstance();
  try {
    const response = await instance.orders.fetchPayments(razorpayOrderId);
    return (response && response.items) ? response.items : [];
  } catch (err) {
    throw new AppError(502, "Failed to fetch Razorpay order payments.", {
      razorpayMessage: err.error && err.error.description ? err.error.description : err.message,
    });
  }
};

// ── Webhook Signature Verification ───────────────────────────────────────────
// Razorpay: HMAC-SHA256(rawBody, webhookSecret) → hex
// Header:   x-razorpay-signature

const verifyWebhookSignature = ({ rawBody, signature }) => {
  const config = getRazorpayConfig();

  if (!config.webhookSecret) {
    return false;
  }

  if (!rawBody || !signature) {
    return false;
  }

  const body = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(String(rawBody));

  const expectedSignature = crypto
    .createHmac("sha256", config.webhookSecret)
    .update(body)
    .digest("hex");

  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(provided, expected);
};

module.exports = {
  getRazorpayConfig,
  createOrder,
  fetchOrder,
  fetchOrderPayments,
  verifyWebhookSignature,
};
