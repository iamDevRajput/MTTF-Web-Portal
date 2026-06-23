const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Frontend URL (both Vite ports)
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Test Route
app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "API is running and MongoDB is connected!",
      timestamp: new Date().toISOString(),
    });
});

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: http://localhost:5173`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});