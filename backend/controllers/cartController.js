const Cart = require("../models/cart-model");

exports.addToCart = async (req, res) => {
  try {
    let { productId, id, title, price, img } = req.body;
    productId = productId || id;

    if (!productId || !title || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing product details",
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === String(productId)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        title,
        price,
        img,
        quantity: 1,
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.error("❌ Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.json({
        success: true,
        cart: { items: [] },
      });
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error("❌ Get cart error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
