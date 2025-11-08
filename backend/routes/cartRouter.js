const express = require("express");
const router = express.Router();
const Cart = require("../models/cart-model");
const { protect } = require("../middlewares/authMiddleware");

// ✅ Get user's cart
router.get("/", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        res.json({ success: true, cart: cart || { items: [] } });
    } catch (err) {
        console.error("❌ Get cart error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ✅ Add item to cart
router.post("/add", protect, async (req, res) => {
    try {
        let { productId, id, title, price, img } = req.body;
        productId = productId || id; // ✅ handle both keys

        if (!productId || !title || !price) {
            return res.status(400).json({ success: false, message: "Missing product details" });
        }


        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const existing = cart.items.find(
            (item) => item.productId?.toString() === productId.toString()
        );

        if (existing) {
            existing.quantity += 1;
        } else {
           cart.items.push({ 
  productId: String(productId),  // ✅ convert to string
  title, 
  price, 
  img, 
  quantity: 1 
});

        }

        await cart.save();
        res.json({ success: true, message: "Item added to cart", cart });
    } catch (err) {
        console.error("❌ Add to cart error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ✅ Remove item
router.delete("/remove/:id", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        cart.items = cart.items.filter(
            (item) => item._id.toString() !== req.params.id
        );

        await cart.save();
        res.json({ success: true, message: "Item removed", cart });
    } catch (err) {
        console.error("❌ Remove from cart error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
