const nodemailer = require("nodemailer");

let cachedTransporter;

const getTransporter = () => {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass || user.includes("your-smtp")) {
    return null;
  }

  if (process.env.EMAIL_HOST) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: process.env.EMAIL_SECURE === "true",
      auth: { user, pass },
    });
  } else {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }

  return cachedTransporter;
};

const sendMembershipConfirmation = async ({ user, payment }) => {
  const transporter = getTransporter();
  if (!transporter) {
    return { sent: false, reason: "Email credentials are not configured." };
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: user.email,
    subject: "Your MTTF lifetime membership is active",
    text: [
      `Hello ${user.name},`,
      "",
      "Your MTTF membership has been activated after verified payment confirmation.",
      `Membership ID: ${user.membershipId}`,
      `Membership Type: ${user.membershipType}`,
      `Order ID: ${payment.orderId}`,
      `Amount: ${payment.currency} ${payment.amount}`,
      "",
      "Thank you for joining MathTech Thinking Foundation.",
    ].join("\n"),
  });

  return { sent: true };
};

const sendDonationCertificate = async ({ donation, certificatePath }) => {
  const transporter = getTransporter();
  if (!transporter) {
    return { sent: false, reason: "Email credentials are not configured." };
  }

  const attachments = certificatePath
    ? [{ filename: `MTTF-Donation-Certificate-${donation.certificateId}.pdf`, path: certificatePath }]
    : [];

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: donation.donorEmail,
    subject: "Thank you for your donation to MTTF — Your Certificate is Attached",
    text: [
      `Dear ${donation.donorName},`,
      "",
      "Thank you for your generous contribution to MathTech Thinking Foundation.",
      "",
      `Donation Amount: ${donation.currency} ${donation.amount}`,
      `Order ID: ${donation.orderId}`,
      `Certificate ID: ${donation.certificateId}`,
      "",
      "Your donation certificate is attached to this email. You may also download it from our website.",
      "",
      "Together, let's educate, innovate, and transform lives.",
      "",
      "With gratitude,",
      "MathTech Thinking Foundation",
    ].join("\n"),
    attachments,
  });

  return { sent: true };
};

module.exports = { sendMembershipConfirmation, sendDonationCertificate };
