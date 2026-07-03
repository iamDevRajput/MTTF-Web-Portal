const express = require("express");
const donationController = require("../controllers/donationController");
const { paymentCreateLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

router.post("/create-order", paymentCreateLimiter, donationController.createOrder);
router.post("/verify", donationController.verify);
router.get("/status/:orderId", donationController.status);
router.get("/certificate/:orderId", donationController.downloadCertificate);

module.exports = router;
