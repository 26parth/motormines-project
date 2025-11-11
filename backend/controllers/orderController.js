const Order = require("../models/order-model");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// ==========================
// 🧾 Create COD Order
// ==========================
const createCodOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      amount: totalAmount,
      address: shippingAddress,
      payment: {
        method: "cod",
        status: "pending",
      },
      status: "processing",
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("COD Order Error:", err);
    res.status(500).json({ success: false, message: "COD order failed" });
  }
};

// ==========================
// 💳 Create Razorpay Order
// ==========================
const createRazorpayOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Create Razorpay Order Error:", err);
    res.status(500).json({ success: false, message: "Failed to create payment order" });
  }
};

// ==========================
// ✅ Verify Razorpay Payment
// ==========================
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderItems,
      address,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid)
      return res.status(400).json({ success: false, message: "Invalid signature" });

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      amount: orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      address,
      payment: {
        method: "razorpay",
        status: "paid",
        razorpay_order_id,
        razorpay_payment_id,
      },
      status: "processing",
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

// ==========================
// 🧑‍💼 Get All Orders (Admin)
// ==========================
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (err) {
//     console.error("Get All Orders Error:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch all orders" });
//   }
// };

// ==========================
// 👤 Get Orders for Logged-in User
// ==========================
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Get User Orders Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
};

// ✅ Export Everything
module.exports = {
  createCodOrder,
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
};

