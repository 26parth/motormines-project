// backend/models/addabout-model.js
const mongoose = require("mongoose");

const addaboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" }, // e.g. "/images/anti-rust.webp"
  path: { type: String, default: "/" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Addabout", addaboutSchema);
