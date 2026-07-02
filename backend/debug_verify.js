const mongoose = require("mongoose");
const paymentService = require("./services/paymentService");
const User = require("./models/User");
require("dotenv").config();

async function debugVerify() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB.");

  const user = await User.findOne({ email: "test5@test.com" });
  if (!user) { console.log("User not found"); process.exit(1); }

  console.log("Mock Mode:", process.env.CASHFREE_MOCK_MODE);
  
  try {
    // Simulate req object logic
    const req = { ip: "127.0.0.1", headers: { "user-agent": "test" } };
    const order = await paymentService.createPaymentOrder({ user, amount: 2000, req });
    
    console.log("Verifying...");
    const res = await paymentService.verifyPaymentWithGateway({ orderId: order.orderId, user, req });
    console.log("Verify Success:", res);
  } catch (err) {
    console.error("DEBUG ERROR:", err);
  }

  process.exit(0);
}

debugVerify();
