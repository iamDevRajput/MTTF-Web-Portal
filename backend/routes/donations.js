const express = require("express");
const donationController = require("../controllers/donationController");
const { paymentCreateLimiter, apiLimiter } = require("../middleware/rateLimiters");
const { requireAdmin } = require("../middleware/adminMiddleware");
const Donation = require("../models/Donation");

const router = express.Router();

router.post("/create-order", paymentCreateLimiter, donationController.createOrder);
router.post("/verify", apiLimiter, donationController.verify);
router.get("/status/:orderId", apiLimiter, donationController.status);
router.get("/certificate/:orderId", apiLimiter, donationController.downloadCertificate);

// GET /api/donations/admin/list
router.get("/admin/list", requireAdmin, async (req, res) => {
  try {
    const { status, search, limit = 100 } = req.query;
    const query = {};
    if (status) query.paymentStatus = String(status).toUpperCase();
    if (search) {
      const safe = new RegExp(String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [
        { donationId: safe },
        { donorName: safe },
        { donorEmail: safe },
      ];
    }
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .limit(Math.min(Number(limit) || 100, 500))
      .select('-processedWebhookKeys -gatewayResponse -paymentSessionId');
    res.json({ success: true, donations });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/donations/admin/export.csv
router.get("/admin/export.csv", requireAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};
    if (status) query.paymentStatus = String(status).toUpperCase();
    if (search) {
      const safe = new RegExp(String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [{ donationId: safe }, { donorName: safe }, { donorEmail: safe }];
    }
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .limit(5000)
      .select('-processedWebhookKeys -gatewayResponse -paymentSessionId');

    const csvValue = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
    const header = ['Donation ID','Donor Name','Donor Email','Donor Phone','Amount','Currency','Status','Certificate ID','Receipt Sent','Created At'];
    const rows = donations.map(d => [
      d.donationId, d.donorName, d.donorEmail, d.donorPhone,
      d.amount, d.currency, d.paymentStatus,
      d.certificateId || '', d.receiptSent,
      d.createdAt?.toISOString()
    ].map(csvValue).join(','));

    res.header('Content-Type', 'text/csv');
    res.attachment(`donations-${Date.now()}.csv`);
    res.send([header.map(csvValue).join(','), ...rows].join('\n'));
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
