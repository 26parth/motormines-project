// backend/routes/productsRouter.js
const express = require('express');
const router = express.Router();
const Product = require("../models/product-model");

// 🟢 Public route: fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

module.exports = router;
