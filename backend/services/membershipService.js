const crypto = require("crypto");
const User = require("../models/User");
const paymentRepository = require("../repositories/paymentRepository");
const emailService = require("./emailService");

const generateMembershipId = () => {
  const suffix = Math.floor(10000000 + Math.random() * 90000000);
  return `MTTF${suffix}`;
};

const activateMembershipForPayment = async ({ payment, ipAddress, userAgent }) => {
  const now = new Date();

  const user = await User.findOneAndUpdate(
    { _id: payment.userId, isMembershipPaid: { $ne: true } },
    {
      isMembershipPaid: true,
      membershipPaidAt: now,
      membershipActivatedAt: now,
      membershipId: generateMembershipId(),
      membershipType: payment.membershipType,
    },
    { new: true }
  );

  if (!user) {
    const existingUser = await User.findById(payment.userId);
    await paymentRepository.appendAuditLog(payment.orderId, {
      event: "MEMBERSHIP_ALREADY_ACTIVE",
      status: "SUCCESS",
      message: "Membership was already active; activation was not repeated.",
      ipAddress,
      userAgent,
      metadata: { membershipId: existingUser?.membershipId },
    });
    return existingUser;
  }

  await paymentRepository.appendAuditLog(payment.orderId, {
    event: "MEMBERSHIP_ACTIVATED",
    status: "SUCCESS",
    message: "Membership activated after verified payment webhook.",
    ipAddress,
    userAgent,
    metadata: {
      membershipId: user.membershipId,
      membershipActivatedAt: user.membershipActivatedAt,
    },
  });

  try {
    const emailResult = await emailService.sendMembershipConfirmation({ user, payment });
    await paymentRepository.appendAuditLog(payment.orderId, {
      event: "CONFIRMATION_EMAIL",
      status: emailResult.sent ? "SUCCESS" : "SKIPPED",
      message: emailResult.sent ? "Membership confirmation email sent." : emailResult.reason,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    await paymentRepository.appendAuditLog(payment.orderId, {
      event: "CONFIRMATION_EMAIL",
      status: "FAILED",
      message: "Membership activated, but confirmation email failed.",
      ipAddress,
      userAgent,
      metadata: { error: error.message },
    });
  }

  return user;
};

module.exports = { activateMembershipForPayment };
