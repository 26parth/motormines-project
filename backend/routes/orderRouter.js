const express = require("express");
const {
  createCodOrder,
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
  // getAllOrders,
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

// 🧑‍💼 Admin: Get all orders
// router.get("/all-orders", protect, getAllOrders); // 👈 new route

module.exports = router;
