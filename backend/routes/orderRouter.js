const express = require("express");
const {
  createCodOrder,
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// 🧾 Create COD order
router.post("/create-cod", protect, createCodOrder);

// 💳 Create Razorpay order
router.post("/create-order", protect, createRazorpayOrder);

// ✅ Verify Razorpay payment
router.post("/verify-payment", protect, verifyPayment);

// 📦 Get all orders of logged-in user
router.get("/orders", protect, getUserOrders);

module.exports = router;
