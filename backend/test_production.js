const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
require("dotenv").config();

async function checkProductionCreate() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const user = await User.findOne({});
  if (!user) return process.exit(1);

  user.isMembershipPaid = false;
  await user.save();

  // Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  console.log("Calling /api/payments/create-order to check PRODUCTION API keys...");
  const createRes = await fetch("http://localhost:8000/api/payments/create-order", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
  });
  const data = await createRes.json();
  
  console.log("\nResponse from Backend:", data);
  if (data.success && data.order.paymentSessionId) {
    console.log("\n✅ SUCCESS! A real production payment session ID was generated.");
    console.log(`Payment Session ID: ${data.order.paymentSessionId}`);
  } else {
    console.log("\n❌ FAILED to create order.");
  }
  process.exit(0);
}

checkProductionCreate().catch(console.error);
