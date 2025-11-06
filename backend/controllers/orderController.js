const Order = require("../models/order-model"); // <-- ye model bana hona chahiye
const asyncHandler = require("express-async-handler");

// ============================
// 1️⃣ Create COD (Cash on Delivery) Order
// ============================
const createCodOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;

  // Validation
  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("No order items provided");
  }

  // Create new order
  const order = await Order.create({
    user: req.user._id, // protect middleware se user aayega
    items,
    totalAmount,
    shippingAddress,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    orderStatus: "Processing",
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully (COD)",
    order,
  });
});

// ============================
// 2️⃣ Get User Orders
// ============================
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

module.exports = {
  createCodOrder,
  getUserOrders,
};
