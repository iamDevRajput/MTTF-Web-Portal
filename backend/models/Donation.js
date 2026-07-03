const mongoose = require("mongoose");

const PAYMENT_STATUSES = ["PENDING", "SUCCESS", "FAILED", "REFUNDED", "CANCELLED"];

const DONATION_PURPOSES = [
  "general",
  "student_scholarship",
  "research",
  "stem_education",
  "ai_education",
  "digital_learning",
  "faculty_development",
  "rural_stem",
  "women_stem",
  "innovation",
  "library",
  "other",
];

const auditLogSchema = new mongoose.Schema({
  event: { type: String, required: true },
  status: { type: String },
  message: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const donationSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  donorName: { type: String, required: true, trim: true },
  donorEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
  donorPhone: { type: String, required: true, trim: true },
  pan: { type: String, trim: true },
  address: { type: String, trim: true },
  purpose: {
    type: String,
    enum: DONATION_PURPOSES,
    default: "general",
    index: true,
  },
  message: { type: String, trim: true },
  amount: { type: Number, required: true, min: 1 },
  currency: { type: String, default: "INR", uppercase: true },
  paymentGateway: { type: String, default: "RAZORPAY" },
  paymentSessionId: { type: String, select: false },
  gatewayPaymentId: { type: String, index: true },
  gatewayOrderStatus: { type: String },
  paymentStatus: {
    type: String,
    enum: PAYMENT_STATUSES,
    default: "PENDING",
    index: true,
  },
  paymentMethod: { type: String },
  paymentTime: { type: Date, index: true },
  webhookVerified: { type: Boolean, default: false, index: true },
  processedWebhookKeys: { type: [String], default: [], select: false },
  auditLogs: { type: [auditLogSchema], default: [] },
  gatewayResponse: { type: mongoose.Schema.Types.Mixed, select: false },
  expiresAt: { type: Date, index: true },
  certificateId: { type: String, unique: true, sparse: true, index: true },
  certificatePath: { type: String, select: false },
  certificateGeneratedAt: { type: Date },
  certificateEmailedAt: { type: Date },
}, { timestamps: true });

donationSchema.index({ donorEmail: 1, createdAt: -1 });
donationSchema.index({ paymentStatus: 1, createdAt: -1 });

donationSchema.statics.statuses = PAYMENT_STATUSES;
donationSchema.statics.purposes = DONATION_PURPOSES;

module.exports = mongoose.model("Donation", donationSchema);
