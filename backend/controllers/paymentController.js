import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order-model.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100), // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ success: false, message: "Razorpay order creation failed" });
  }
};

// Verify Payment & Save Order
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderItems, address } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const newOrder = await Order.create({
      user: req.user._id,
      items: orderItems.map(i => ({
        productId: i.productId,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        img: i.img,
      })),
      amount: orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      address,
      payment: {
        method: "razorpay",
        status: "paid",
        razorpay_payment_id,
        razorpay_order_id,
      },
      status: "processing",
    });

    res.status(200).json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
};
