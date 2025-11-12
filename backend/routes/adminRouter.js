const express = require("express");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const {
  adminLogin, refreshToken, logout,
  getAllUsers, getAllOrders,
  getAllProducts, addProduct, updateProduct, deleteProduct,
  getAllAddabout, addAddabout, updateAddabout, deleteAddabout,
} = require("../controllers/adminController");

const router = express.Router();

// 🔐 Auth Routes
router.post("/login", adminLogin);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

// 👥 Users
router.get("/users", adminMiddleware, getAllUsers);

// 🧾 Orders
router.get("/orders", adminMiddleware, getAllOrders);

// 📦 Products
router.get("/products", adminMiddleware, getAllProducts);
router.post("/products", adminMiddleware, addProduct);
router.put("/products/:id", adminMiddleware, updateProduct);
router.delete("/products/:id", adminMiddleware, deleteProduct);

// 🧩 Addabout Routes
router.get("/addabout", adminMiddleware, getAllAddabout);
router.post("/addabout", adminMiddleware, addAddabout);
router.put("/addabout/:id", adminMiddleware, updateAddabout);
router.delete("/addabout/:id", adminMiddleware, deleteAddabout);


module.exports = router;
