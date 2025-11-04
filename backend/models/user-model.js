const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
  contact: Number,
  isadmin: { type: Boolean, default: false },
  cart: { type: Array, default: [] },
  orders: { type: Array, default: [] },
  picture: String,

  // 👇 Order address save karne ke liye use kara hai !!
  address: {
    country: { type: String, default: "India" },
    state: String,
    city: String,
    street: String,
    pincode: String,
    phone: String,
  },
});

module.exports = mongoose.model("user", userSchema);


// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//   fullname: { type: String, required: true },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   password: { type: String, required: true },
//   cart: { type: Array, default: [] },
//   isadmin: { type: Boolean, default: false },
//   orders: { type: Array, default: [] },
//   contact: { type: Number, default: null },
//   picture: { type: String, default: "" },
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);


// const mongoose = require('mongoose');
// // mongoose.connect("mongodb://127.0.0.1:27017/motormines");

// const userSchema = mongoose.Schema({

//     fullname: String,
//     email: String,
//     password: String,
//     cart: {
//         type: Array,
//         default: []
//     },
//     isadmin: Boolean,
//     orders: {
//         type: Array,
//         default: []
//     },
//     contact: Number,
//     picture: String,

// });

// module.exports = mongoose.model("user", userSchema);

