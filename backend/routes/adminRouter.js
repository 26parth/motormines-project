const express = require("express");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const {
  adminLogin, refreshToken, logout,
  getAllUsers, getAllOrders,
  getAllProducts, addProduct, updateProduct, deleteProduct,
  getAllFeatures, addFeature, updateFeature, deleteFeature
} = require("../controllers/adminController");

const router = express.Router();

// 🔐 Auth Routes
router.post("/login", adminLogin);
router.post("/refresh", refreshToken);
router.post("/logout", adminMiddleware, logout);

// 👥 Users
router.get("/users", adminMiddleware, getAllUsers);

// 🧾 Orders
router.get("/orders", adminMiddleware, getAllOrders);

// 📦 Products
router.get("/products", adminMiddleware, getAllProducts);
router.post("/products", adminMiddleware, addProduct);
router.put("/products/:id", adminMiddleware, updateProduct);
router.delete("/products/:id", adminMiddleware, deleteProduct);

// 🌟 Features
router.get("/features", adminMiddleware, getAllFeatures);
router.post("/features", adminMiddleware, addFeature);
router.put("/features/:id", adminMiddleware, updateFeature);
router.delete("/features/:id", adminMiddleware, deleteFeature);


module.exports = router;
