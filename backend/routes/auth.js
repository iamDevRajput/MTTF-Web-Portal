const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { name, phone, email, password, dob, membershipType, institutionSize } = req.body;

    // 1. name: min 3 characters
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Full name must be at least 3 characters.',
      });
    }

    // 2. phone: required + valid national number (digits after country code)
    const phoneStr = phone ? phone.trim() : '';
    // Extract country code prefix (+91, +1, etc.) and local number
    const phoneMatch = phoneStr.match(/^(\+\d{1,4})(\d{4,15})$/);
    if (!phoneStr || !phoneMatch) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid phone number with country code.',
      });
    }
    const fullPhone = phoneStr; // stored as-is e.g. +91XXXXXXXXXX

    // 3. phone uniqueness check (on full number including country code)
    const existingPhone = await User.findOne({ phone: fullPhone });
    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: 'This phone number is already registered.',
      });
    }

    // 4. email uniqueness check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered.',
      });
    }

    // 5. dob: required + must be a valid past date
    if (!dob) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid date of birth.',
      });
    }
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime()) || dobDate >= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid date of birth.',
      });
    }

    // 6. password: min 6 characters
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    // 7. membershipType validation
    if (!membershipType) {
      return res.status(400).json({
        success: false,
        message: 'Please select a membership type.',
      });
    }

    if (membershipType === 'institutional' && !institutionSize) {
      return res.status(400).json({
        success: false,
        message: 'Institution size is required for institutional memberships',
      });
    }

    // Create new user — bcrypt hash kept exactly as is (salt 12)
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Creating user with hashed password');
    const user = new User({
      name: name.trim(),
      phone: fullPhone,
      dob: dobDate,
      email,
      password: hashedPassword,
      membershipType,
      institutionSize: membershipType === 'institutional' ? institutionSize : undefined,
    });

    await user.save();
    console.log('User saved successfully');

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        membershipType: user.membershipType,
        institutionSize: user.institutionSize,
        isMembershipPaid: user.isMembershipPaid,
        membershipId: user.membershipId,
        membershipActivatedAt: user.membershipActivatedAt,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
    });
  }
});


// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        membershipType: user.membershipType,
        institutionSize: user.institutionSize,
        isMembershipPaid: user.isMembershipPaid,
        membershipId: user.membershipId,
        membershipActivatedAt: user.membershipActivatedAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user (protected route)
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid',
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        membershipType: user.membershipType,
        institutionSize: user.institutionSize,
        isEmailVerified: user.isEmailVerified,
        isMembershipPaid: user.isMembershipPaid,
        membershipPaidAt: user.membershipPaidAt,
        membershipId: user.membershipId,
        membershipActivatedAt: user.membershipActivatedAt,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
});

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ success: false, message: 'This email is already registered.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const OtpVerification = require('../models/OtpVerification');
    
    await OtpVerification.deleteMany({ email });
    await OtpVerification.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.json({ success: true, message: 'OTP generated.', devOtp: otp });
    }

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"MTTF" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'MTTF Email Verification OTP',
      html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f8faff;">
        <h2 style="color:#0b1329;">Email Verification</h2>
        <p style="color:#475569;">Your OTP expires in 10 minutes.</p>
        <div style="background:#2563eb;color:#fff;font-size:32px;font-weight:700;letter-spacing:8px;text-align:center;padding:20px;border-radius:8px;">${otp}</div>
      </div>`,
    });

    res.json({ success: true, message: 'OTP sent to your email.' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP.' });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP required.' });

    const OtpVerification = require('../models/OtpVerification');
    const record = await OtpVerification.findOne({ email, verified: false }).sort({ createdAt: -1 });

    if (!record) return res.status(400).json({ success: false, message: 'No OTP found. Request a new one.' });
    if (new Date() > record.expiresAt) return res.status(400).json({ success: false, message: 'OTP expired. Request a new one.' });
    if (record.otp !== String(otp)) return res.status(400).json({ success: false, message: 'Invalid OTP.' });

    await OtpVerification.updateOne({ _id: record._id }, { verified: true });
    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'OTP verification failed.' });
  }
});

module.exports = router;
