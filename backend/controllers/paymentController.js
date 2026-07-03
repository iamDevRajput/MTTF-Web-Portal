const asyncHandler = require("../utils/asyncHandler");
const paymentService = require("../services/paymentService");

const getConfig = asyncHandler(async (req, res) => {
  const config = await paymentService.getPublicMembershipConfig();
  res.json({ success: true, ...config });
});

const createOrder = asyncHandler(async (req, res) => {
  const order = await paymentService.createPaymentOrder({ user: req.user, req });
  res.status(201).json({ success: true, order });
});

const webhook = asyncHandler(async (req, res) => {
  const result = await paymentService.handleRazorpayWebhook({ req });
  res.json({ success: true, ...result });
});

const status = asyncHandler(async (req, res) => {
  const payment = await paymentService.getPaymentStatus({
    orderId: req.params.orderId,
    user: req.user,
  });
  res.json({ success: true, payment });
});

const verify = async (req, res) => {
  try {
    const payment = await paymentService.verifyPaymentWithGateway({
      orderId: req.body.orderId,
      user: req.user,
      req,
    });
    res.json({ success: true, payment });
  } catch (error) {
    console.error("VERIFY_ERROR_STACK:", error.stack);
    res.status(500).json({ success: false, message: error.message, stack: error.stack });
  }
};

const history = asyncHandler(async (req, res) => {
  const payments = await paymentService.getPaymentHistory({ user: req.user });
  res.json({ success: true, payments });
});

module.exports = {
  getConfig,
  createOrder,
  webhook,
  status,
  verify,
  history,
};
