const Donation = require("../models/Donation");

const createDonation = (data) => Donation.create(data);

const findByOrderId = (orderId, includeSecrets = false) => {
  let query = Donation.findOne({ orderId });
  if (includeSecrets) {
    query = query.select("+paymentSessionId +processedWebhookKeys +gatewayResponse +certificatePath");
  }
  return query;
};

const updateDonation = (orderId, update) => (
  Donation.findOneAndUpdate({ orderId }, update, { new: true })
    .select("+paymentSessionId +processedWebhookKeys +gatewayResponse +certificatePath")
);

const appendAuditLog = (orderId, log) => (
  Donation.findOneAndUpdate(
    { orderId },
    { $push: { auditLogs: log } },
    { new: true }
  )
);

const findReusablePending = (email, amount) => (
  Donation.findOne({
    donorEmail: email.toLowerCase(),
    amount,
    paymentStatus: "PENDING",
    expiresAt: { $gt: new Date() },
    paymentSessionId: { $exists: true, $ne: null },
  }).select("+paymentSessionId")
);

module.exports = {
  createDonation,
  findByOrderId,
  updateDonation,
  appendAuditLog,
  findReusablePending,
};
