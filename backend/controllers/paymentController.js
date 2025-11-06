const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/order-model");
const User = require("../models/user-model");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_xxx",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret",
});

// POST /payment/create-order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ success: false, message: "Invalid amount" });

    // Razorpay expects amount in paise
    const options = {
      amount: Math.round(amount * 100), // rupees -> paise
      currency,
      receipt: `rcpt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

// POST /payment/verify-payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, address } = req.body;

    // verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // find user from req (using protect middleware that sets req.user)
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });

    // compute amount numeric from cartItems (frontend should pass items with numeric price)
    const amount = cartItems.reduce((s, it) => s + Number(it.priceNumeric) * it.quantity, 0);

    // create order record
    const newOrder = new Order({
      user: user._id,
      items: cartItems.map(i => ({
        productId: i.id,
        title: i.title,
        price: Number(i.priceNumeric),
        quantity: i.quantity,
        img: i.img,
      })),
      amount,
      address,
      payment: {
        method: "razorpay",
        status: "paid",
        razorpay_payment_id,
        razorpay_order_id,
      },
      status: "processing",
    });

    await newOrder.save();

    // optionally push order id into user.orders
    user.orders = user.orders || [];
    user.orders.push(newOrder._id);
    await user.save();

    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error("verifyPayment error:", err);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
