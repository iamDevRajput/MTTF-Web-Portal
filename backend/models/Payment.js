const mongoose = require("mongoose");

const PAYMENT_STATUSES = ["PENDING", "SUCCESS", "FAILED", "REFUNDED", "CANCELLED"];

const auditLogSchema = new mongoose.Schema({
  event: { type: String, required: true },
  status: { type: String },
  message: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  userName: { type: String, required: true, trim: true },
  userEmail: { type: String, required: true, lowercase: true, trim: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR", uppercase: true },
  paymentGateway: { type: String, default: "CASHFREE" },
  paymentSessionId: { type: String, select: false },
  cfPaymentId: { type: String, index: true },
  cashfreeOrderStatus: { type: String },
  paymentStatus: {
    type: String,
    enum: PAYMENT_STATUSES,
    default: "PENDING",
    index: true,
  },
  paymentMethod: { type: String },
  membershipType: {
    type: String,
    required: true,
    enum: ["individual", "institutional"],
    index: true,
  },
  webhookVerified: { type: Boolean, default: false, index: true },
  processedWebhookKeys: { type: [String], default: [], select: false },
  auditLogs: { type: [auditLogSchema], default: [] },
  gatewayResponse: { type: mongoose.Schema.Types.Mixed, select: false },
  expiresAt: { type: Date, index: true },
}, { timestamps: true });

paymentSchema.index({ userId: 1, paymentStatus: 1, createdAt: -1 });
paymentSchema.index({ userEmail: 1, createdAt: -1 });

paymentSchema.statics.statuses = PAYMENT_STATUSES;

module.exports = mongoose.model("Payment", paymentSchema);
