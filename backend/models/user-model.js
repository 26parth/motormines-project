const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String },
  isAdmin: { type: Boolean, default: false },
  cart: { type: Array, default: [] },   //cart ham localstrorage kai throught la rahe hai 

  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Order ham backend ke throught la rahe hai 
  img: String,  // pata nahi kya kaha se aa raha hai 

  // 👇 Order address save karne ke liye use kara hai !!
  address: {
    country: { type: String, default: "India" },
    state: String,
    city: String,
    street: String,
    pincode: String,
    phone: String,
  },
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);

