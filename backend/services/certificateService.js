const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");

const CERT_DIR = path.join(__dirname, "..", "certificates");
const LOGO_PATH = path.join(__dirname, "..", "assets", "mttf-logo.jfif");

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

const formatDate = (date) => new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(date);

const formatAmount = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

const generateDonationCertificate = async (donation) => {
  ensureCertDir();

  const certificateId = donation.certificateId || generateCertificateId();
  const fileName = `${certificateId}.pdf`;
  const filePath = path.join(CERT_DIR, fileName);
  const purposeLabel = PURPOSE_LABELS[donation.purpose] || "Charitable Contribution";
  const issuedDate = donation.paymentTime || donation.certificateGeneratedAt || new Date();
  const paymentRef = donation.cfPaymentId || donation.orderId;

  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
      .lineWidth(2)
      .strokeColor("#2563eb")
      .stroke();

    doc.rect(36, 36, doc.page.width - 72, doc.page.height - 72)
      .lineWidth(0.5)
      .strokeColor("#60a5fa")
      .stroke();

    if (fs.existsSync(LOGO_PATH)) {
      doc.image(LOGO_PATH, doc.page.width / 2 - 40, 50, { width: 80, height: 80 });
      doc.y = 140;
    } else {
      doc.y = 60;
    }

    doc.fontSize(22).fillColor("#0b1329").font("Helvetica-Bold")
      .text("MathTech Thinking Foundation", { align: "center" });
    doc.moveDown(0.3);
    doc.fontSize(14).fillColor("#2563eb").font("Helvetica-Bold")
      .text("Certificate of Donation", { align: "center" });
    doc.moveDown(1.2);

    doc.moveTo(150, doc.y).lineTo(doc.page.width - 150, doc.y)
      .strokeColor("#3b82f6").lineWidth(1).stroke();
    doc.moveDown(1.2);

    doc.fontSize(12).fillColor("#475569").font("Helvetica")
      .text("This certificate is proudly presented to", { align: "center" });
    doc.moveDown(0.5);

    doc.fontSize(26).fillColor("#0b1329").font("Helvetica-Bold")
      .text(donation.donorName, { align: "center" });
    doc.moveDown(0.8);

    doc.fontSize(12).fillColor("#475569").font("Helvetica")
      .text(`For supporting ${purposeLabel}`, { align: "center" });
    doc.moveDown(1.2);

    const boxY = doc.y;
    doc.rect(80, boxY, doc.page.width - 160, 150)
      .fillColor("#f8fafc").fill()
      .strokeColor("#e2e8f0").stroke();

    const details = [
      ["Donation Amount", formatAmount(donation.amount)],
      ["Purpose", purposeLabel],
      ["Date of Donation", formatDate(issuedDate)],
      ["Certificate Number", certificateId],
      ["Payment Reference", paymentRef],
      ["Order ID", donation.orderId],
    ];

    details.forEach(([label, value], index) => {
      const y = boxY + 18 + index * 22;
      doc.fillColor("#475569").fontSize(10).font("Helvetica").text(label, 100, y);
      doc.fillColor("#0b1329").font("Helvetica-Bold").text(String(value), 280, y, { width: 240 });
    });

    doc.fontSize(10).fillColor("#475569").font("Helvetica")
      .text(
        "MathTech Thinking Foundation is a Section 8 (Not-for-Profit) Company registered under Section 12AB and approved under Section 80G of the Income Tax Act, 1961.",
        60, doc.page.height - 120,
        { align: "center", width: doc.page.width - 120 }
      );

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
  getCertificatePath,
  PURPOSE_LABELS,
};
