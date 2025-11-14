// backend/models/addabout-model.js
const mongoose = require("mongoose");

const addaboutSchema = new mongoose.Schema({
  name: { type: String, required: true },         // 🟢 title → name
  price: { type: Number, required: true },        // 🟢 path → price
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Addabout", addaboutSchema);
