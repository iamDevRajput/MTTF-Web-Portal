const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

const CERT_DIR = path.join(__dirname, "..", "certificates");
// Paths for logos and signatures (will gracefully fallback if not found)
const LOGO_PATH = path.join(__dirname, "..", "..", "frontend", "src", "assets", "home", "mttf-logo.png");
const SIGN1_PATH = path.join(__dirname, "..", "assets", "sign_mehar.png"); // Example paths
const SIGN2_PATH = path.join(__dirname, "..", "assets", "sign_archna.png");

const PURPOSE_LABELS = {
  general: "General Donation",
  student_scholarship: "Student Scholarship",
  research: "Research & Innovation",
  stem_education: "STEM Education",
  ai_education: "AI & Data Science Education",
  digital_learning: "Digital Learning Infrastructure",
  faculty_development: "Faculty Development",
  rural_stem: "Rural STEM Education",
  women_stem: "Women in STEM",
  innovation: "Innovation & Entrepreneurship",
  library: "Library & Knowledge Resources",
  other: "Charitable Contribution",
};

const ensureCertDir = () => {
  if (!fs.existsSync(CERT_DIR)) {
    fs.mkdirSync(CERT_DIR, { recursive: true });
  }
};

const generateCertificateId = () => {
  const suffix = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `MTTF-CERT-${Date.now().toString(36).toUpperCase()}-${suffix}`;
};

const formatEventDate = (startDate, endDate) => {
  if (!startDate) return "—";
  const start = new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric" }).format(startDate);
  if (!endDate) return `${start}, ${startDate.getFullYear()}`;
  const end = new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric", year: "numeric" }).format(endDate);
  return `${start} – ${end}`;
};

const formatDate = (date) => new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(date);

const formatTime = (date) => new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata"
}).format(date) + " IST";

const formatAmount = (amount) => `Rs. ${Number(amount).toLocaleString("en-IN")}`;

// Reusable drawing function
const drawPremiumCertificate = async (doc, data) => {
  const { width, height } = doc.page;

  // Double blue border
  doc.rect(30, 30, width - 60, height - 60)
    .lineWidth(3)
    .strokeColor("#2563eb")
    .stroke();

  doc.rect(36, 36, width - 72, height - 72)
    .lineWidth(1)
    .strokeColor("#60a5fa")
    .stroke();

  // Logo (maintain aspect ratio)
  if (fs.existsSync(LOGO_PATH)) {
    // Omitting height so PDFKit auto-scales proportionally
    doc.image(LOGO_PATH, width / 2 - 50, 50, { width: 100 });
    doc.y = 125;
  } else {
    doc.y = 80;
  }

  // Top header (Event or Donation)
  const title = data.type === "DONATION" ? "CERTIFICATE OF CONTRIBUTION" : "CERTIFICATE OF PARTICIPATION";
  
  doc.fontSize(22).fillColor("#2563eb").font("Helvetica-Bold")
    .text(title, { align: "center", characterSpacing: 6 });
  
  doc.moveDown(1.5);

  doc.fontSize(14).fillColor("#475569").font("Helvetica")
    .text("This is to certify that", { align: "center" });
  
  doc.moveDown(0.8);

  // Participant/Donor Name (Large bold)
  doc.fontSize(36).fillColor("#0b1329").font("Times-Bold")
    .text(data.participantName, { align: "center" });
  
  doc.moveDown(0.5);

  // Institution / Additional details
  if (data.type === "PARTICIPATION" && data.institution) {
    doc.fontSize(14).fillColor("#475569").font("Helvetica")
      .text(`from ${data.institution}`, { align: "center" });
    doc.moveDown(0.8);
    doc.text("has successfully participated in", { align: "center" });
  } else if (data.type === "DONATION") {
    doc.fontSize(14).fillColor("#475569").font("Helvetica")
      .text("has generously donated towards", { align: "center" });
  }
  
  doc.moveDown(1);

  // Event Box / Purpose Box
  const boxY = doc.y;
  const boxHeight = 90;
  
  doc.rect(120, boxY, width - 240, boxHeight)
    .fillColor("#eff6ff").fill()
    .strokeColor("#bfdbfe").lineWidth(1).stroke();

  // Inside Box
  doc.y = boxY + 25;
  if (data.type === "DONATION") {
    doc.fontSize(18).fillColor("#1e3a8a").font("Helvetica-Bold")
      .text(data.purpose, { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor("#2563eb").font("Helvetica-Bold")
      .text(`Amount: ${formatAmount(data.amount)}  |  Date: ${formatDate(data.issuedAt)}`, { align: "center" });
  } else {
    doc.fontSize(18).fillColor("#1e3a8a").font("Helvetica-Bold")
      .text(data.eventName, { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor("#2563eb").font("Helvetica-Bold")
      .text(formatEventDate(data.eventStartDate, data.eventEndDate), { align: "center" });
  }

  // QR Code
  if (data.qrCodeUrl) {
    try {
      const qrDataUri = await QRCode.toDataURL(data.qrCodeUrl, { errorCorrectionLevel: 'H', margin: 1 });
      const qrSize = 100;
      doc.image(qrDataUri, (width - qrSize) / 2, height - 200, { width: qrSize });
      doc.fontSize(9).fillColor("#64748b").font("Helvetica").text("Scan to Verify Authenticity", (width - qrSize) / 2 - 20, height - 95, { width: 140, align: "center" });
    } catch (err) {
      console.error("QR Generation failed", err);
    }
  }

  // Bottom Left: Issue Date & Time
  const bottomY = height - 120;
  const textY = bottomY + 20; // Lowered to prevent overlap with signature block
  doc.fontSize(10).fillColor("#64748b").font("Helvetica").text("Date of Issue", 80, textY);
  const dateTimeStr = `${formatDate(data.issuedAt)} • ${formatTime(data.issuedAt)}`;
  doc.fontSize(12).fillColor("#0b1329").font("Helvetica-Bold").text(dateTimeStr, 80, textY + 15);

  // Bottom Right: Certificate ID
  const certIdY = bottomY + 20; // Move down to avoid signature text overlap
  doc.fontSize(10).fillColor("#64748b").font("Helvetica").text("Certificate ID", width - 380, certIdY, { width: 300, align: "right" });
  doc.fontSize(12).fillColor("#0b1329").font("Helvetica-Bold").text(data.certificateId, width - 380, certIdY + 15, { width: 300, align: "right" });

  // Signatures
  const signY = height - 160;
  
  // Signature 1 (Left)
  doc.moveTo(80, signY).lineTo(250, signY).lineWidth(1).strokeColor("#cbd5e1").stroke();
  if (fs.existsSync(SIGN1_PATH)) {
    doc.image(SIGN1_PATH, 110, signY - 50, { width: 100 });
  }
  doc.fontSize(11).fillColor("#0b1329").font("Helvetica-Bold").text("DR. MEHAR CHAND", 80, signY + 10, { width: 170, align: "center" });
  doc.fontSize(9).fillColor("#475569").font("Helvetica").text("President, MathTech Thinking Foundation,\nFazilka, INDIA", 80, signY + 25, { width: 170, align: "center" });

  // Signature 2 (Right)
  doc.moveTo(width - 250, signY).lineTo(width - 80, signY).lineWidth(1).strokeColor("#cbd5e1").stroke();
  if (fs.existsSync(SIGN2_PATH)) {
    doc.image(SIGN2_PATH, width - 220, signY - 50, { width: 100 });
  }
  doc.fontSize(11).fillColor("#0b1329").font("Helvetica-Bold").text("DR. ARCHNA PRASAD", width - 250, signY + 10, { width: 170, align: "center" });
  doc.fontSize(9).fillColor("#475569").font("Helvetica").text("Principal, M.O.P. Vaishnav College for Women\n(Autonomous), Chennai, INDIA", width - 250, signY + 25, { width: 170, align: "center" });

  // Optional: Tax note for donations
  if (data.type === "DONATION") {
    doc.fontSize(9).fillColor("#94a3b8").font("Helvetica").text(
      "MathTech Thinking Foundation is registered under Section 12AB and approved under Section 80G of the Income Tax Act, 1961.",
      0, height - 55, { align: "center", width }
    );
  }
};

const getFrontendUrl = () => process.env.FRONTEND_URL || "http://localhost:5173";

const generateDonationCertificate = async (donation) => {
  ensureCertDir();
  const Certificate = require("../models/Certificate");

  const certificateId = donation.certificateId || generateCertificateId();
  const fileName = `${certificateId}.pdf`;
  const filePath = path.join(CERT_DIR, fileName);
  
  const purposeLabel = PURPOSE_LABELS[donation.purpose] || "Charitable Contribution";
  const issuedDate = donation.paymentTime || donation.certificateGeneratedAt || new Date();
  
  const qrCodeUrl = `${getFrontendUrl()}/certificate/verify/${certificateId}`;

  // Persist to new generic Certificate collection for public verification
  await Certificate.findOneAndUpdate(
    { certificateId },
    {
      certificateId,
      certificateType: "DONATION",
      participantName: donation.donorName,
      purpose: purposeLabel,
      amount: donation.amount,
      issuedAt: issuedDate,
      qrCodeUrl,
      orderId: donation.orderId,
    },
    { upsert: true, new: true }
  );

  const data = {
    type: "DONATION",
    participantName: donation.donorName,
    purpose: purposeLabel,
    amount: donation.amount,
    issuedAt: issuedDate,
    certificateId,
    qrCodeUrl,
  };

  await new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 0 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    await drawPremiumCertificate(doc, data);

    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  return { certificateId, filePath, fileName };
};

const generateEventCertificate = async (eventData) => {
  ensureCertDir();
  const Certificate = require("../models/Certificate");

  const certificateId = eventData.certificateId || generateCertificateId();
  const fileName = `${certificateId}.pdf`;
  const filePath = path.join(CERT_DIR, fileName);
  const issuedDate = eventData.issuedAt || new Date();
  const qrCodeUrl = `${getFrontendUrl()}/certificate/verify/${certificateId}`;

  // Persist to generic Certificate collection
  await Certificate.findOneAndUpdate(
    { certificateId },
    {
      certificateId,
      certificateType: "PARTICIPATION",
      participantName: eventData.participantName,
      institution: eventData.institution,
      eventName: eventData.eventName,
      eventStartDate: eventData.eventStartDate,
      eventEndDate: eventData.eventEndDate,
      issuedAt: issuedDate,
      qrCodeUrl,
    },
    { upsert: true, new: true }
  );

  const data = {
    type: "PARTICIPATION",
    participantName: eventData.participantName,
    institution: eventData.institution,
    eventName: eventData.eventName,
    eventStartDate: eventData.eventStartDate,
    eventEndDate: eventData.eventEndDate,
    issuedAt: issuedDate,
    certificateId,
    qrCodeUrl,
  };

  await new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 0 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    await drawPremiumCertificate(doc, data);

    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  return { certificateId, filePath, fileName };
};

const getCertificatePath = (certificateId) => {
  const filePath = path.join(CERT_DIR, `${certificateId}.pdf`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return filePath;
};

module.exports = {
  generateDonationCertificate,
  generateEventCertificate,
  getCertificatePath,
  PURPOSE_LABELS,
};
