const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Settings = require('../models/Settings');
const router = express.Router();

// ─── Admin Auth Middleware ────────────────────────────────────────────────────
const requireAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'Admin access required.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ success: false, message: 'Not authorized.' });
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid admin token.' });
  }
};

// ─── Helper: Get or init prices ──────────────────────────────────────────────
const getOrInitPrices = async () => {
  let settings = await Settings.findOne({ key: 'membershipPrices' });
  if (!settings) {
    settings = await Settings.create({
      key: 'membershipPrices',
      value: { individual: 2000, institutional: 5000 },
    });
  }
  return settings;
};

// ─── POST /api/admin/login ────────────────────────────────────────────────────
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password required.' });

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD)
    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });

  const token = jwt.sign({ isAdmin: true, email }, process.env.JWT_SECRET, { expiresIn: '8h' });

  res.json({ success: true, token });
});

// ─── GET /api/admin/settings ──────────────────────────────────────────────────
router.get('/settings', requireAdmin, async (req, res) => {
  try {
    const settings = await getOrInitPrices();
    res.json({ success: true, prices: settings.value });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─── PUT /api/admin/settings ──────────────────────────────────────────────────
router.put('/settings', requireAdmin, async (req, res) => {
  try {
    const { individual, institutional } = req.body;
    if (!individual || !institutional || individual < 1 || institutional < 1)
      return res.status(400).json({ success: false, message: 'Valid prices required.' });

    const settings = await Settings.findOneAndUpdate(
      { key: 'membershipPrices' },
      { value: { individual: Number(individual), institutional: Number(institutional) } },
      { upsert: true, new: true }
    );
    res.json({ success: true, prices: settings.value });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const paidUsers = await User.countDocuments({ isMembershipPaid: true });
    const pendingUsers = totalUsers - paidUsers;
    const settings = await getOrInitPrices();
    const prices = settings.value;

    // rough revenue estimate
    const paidIndividual = await User.countDocuments({ isMembershipPaid: true, membershipType: 'individual' });
    const paidInstitutional = await User.countDocuments({ isMembershipPaid: true, membershipType: 'institutional' });
    const revenue = paidIndividual * prices.individual + paidInstitutional * prices.institutional;

    res.json({ success: true, stats: { totalUsers, paidUsers, pendingUsers, revenue } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─── Public: GET /api/admin/prices (for payment page) ────────────────────────
router.get('/prices', async (req, res) => {
  try {
    const settings = await getOrInitPrices();
    res.json({ success: true, prices: settings.value });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
