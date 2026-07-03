const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  certificateType: {
    type: String,
    default: "PARTICIPATION", // PARTICIPATION, DONATION, etc.
  },
  participantName: { type: String, required: true },
  institution: { type: String },
  
  eventName: { type: String },
  eventStartDate: { type: Date },
  eventEndDate: { type: Date },

  // For donations
  purpose: { type: String },
  amount: { type: Number },
  
  issuedAt: { type: Date, default: Date.now },
  timezone: { type: String, default: "Asia/Kolkata" },
  qrCodeUrl: { type: String },
  
  // Link back to related entity if needed
  orderId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Certificate", certificateSchema);
