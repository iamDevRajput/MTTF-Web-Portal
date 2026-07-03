const express = require("express");
const donationController = require("../controllers/donationController");
const { paymentCreateLimiter, apiLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

router.post("/create-order", paymentCreateLimiter, donationController.createOrder);
router.post("/verify", apiLimiter, donationController.verify);
router.get("/status/:orderId", apiLimiter, donationController.status);
router.get("/certificate/:orderId", apiLimiter, donationController.downloadCertificate);

module.exports = router;
