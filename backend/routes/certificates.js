const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const path = require("path");
const fs = require("fs");

// @route   GET /api/certificates/verify/:certificateId
// @desc    Get public certificate verification details
// @access  Public
router.get(
  "/verify/:certificateId",
  asyncHandler(async (req, res) => {
    const certificate = await Certificate.findOne({ certificateId: req.params.certificateId });
    if (!certificate) {
      throw new AppError(404, "INVALID CERTIFICATE");
    }
    res.json({ success: true, certificate });
  })
);

// @route   GET /api/certificates/download/:certificateId
// @desc    Download the generated certificate PDF
// @access  Public
router.get(
  "/download/:certificateId",
  asyncHandler(async (req, res) => {
    const certificate = await Certificate.findOne({ certificateId: req.params.certificateId });
    if (!certificate) {
      throw new AppError(404, "INVALID CERTIFICATE");
    }

    const filePath = path.join(__dirname, "..", "certificates", `${req.params.certificateId}.pdf`);
    if (!fs.existsSync(filePath)) {
      throw new AppError(404, "Certificate PDF not found on server.");
    }

    res.download(filePath, `${req.params.certificateId}.pdf`);
  })
);

module.exports = router;
