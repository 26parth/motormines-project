const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { addToCart, getCart } = require("../controllers/cartController");

// ⚠️ Yaha sirf function ka naam pass karna hai — call nahi karna
router.post("/add", protect, addToCart);
router.get("/", protect, getCart);

module.exports = router;
