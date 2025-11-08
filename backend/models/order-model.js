const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      img: String,
    },
  ],
  amount: { type: Number, required: true }, // Total amount
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
    type: String,
    enum: ["processing", "packed", "shipped", "out_for_delivery", "delivered", "cancelled"],
    default: "processing",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", orderSchema);
