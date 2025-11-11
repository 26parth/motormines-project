const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" }, // frontend uses `image`
  path: { type: String, default: "/" }, // route path like "/anti-rust"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feature", featureSchema);
