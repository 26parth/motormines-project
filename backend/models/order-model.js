const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      productId: Number, // or String depending on your product id type
      title: String,
      price: Number,
      quantity: Number,
      img: String,
    },
  ],
  amount: { type: Number, required: true }, // in paise or rupees (we will use rupees)
  address: {
    country: String,
    state: String,
    city: String,
    street: String,
    pincode: String,
    phone: String,
  },
  payment: {
    method: { type: String, enum: ["razorpay", "cod"], default: "cod" },
    status: { type: String, enum: ["paid", "pending", "failed"], default: "pending" },
    razorpay_payment_id: String,
    razorpay_order_id: String,
  },
  status: {
    // order fulfillment status shown to user
    type: String,
    enum: ["processing", "packed", "shipped", "out_for_delivery", "delivered", "cancelled"],
    default: "processing",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
