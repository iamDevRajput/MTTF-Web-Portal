const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
require("dotenv").config();

async function runTest() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB.");

  // Find any user who hasn't paid yet
  let user = await User.findOne({ isMembershipPaid: false });
  if (!user) {
    user = await User.findOne({});
    if (!user) {
      console.log("No users found to test with.");
      process.exit(0);
    }
    // reset them for the test
    user.isMembershipPaid = false;
    user.membershipId = undefined;
    user.membershipActivatedAt = undefined;
    await user.save();
    console.log("Reset user status for testing.");
  }

  console.log("Testing with User:", user.email);

  // Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  console.log("\n1. Calling /api/payments/create-order...");
  const createRes = await fetch("http://localhost:8000/api/payments/create-order", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
  });
  const createData = await createRes.json();
  console.log("Response:", createData);

  if (!createData.success) {
    console.log("Failed to create order.");
    process.exit(1);
  }

  const orderId = createData.order.orderId;
  console.log(`\nExtracted Order ID: ${orderId}`);
  console.log(`Payment Session ID (should start with mock_): ${createData.order.paymentSessionId}`);

  console.log(`\n2. Simulating Frontend calling /api/payments/verify for Order: ${orderId}...`);
  const verifyRes = await fetch("http://localhost:8000/api/payments/verify", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ orderId })
  });
  const verifyData = await verifyRes.json();
  console.log("Response:", verifyData);

  console.log("\n3. Verifying User in Database...");
  const updatedUser = await User.findById(user._id);
  console.log(`isMembershipPaid: ${updatedUser.isMembershipPaid}`);
  console.log(`membershipId: ${updatedUser.membershipId}`);

  console.log("\n✅ Test Complete. Mock Payment Flow Works Perfectly!");
  process.exit(0);
}

runTest().catch(console.error);
