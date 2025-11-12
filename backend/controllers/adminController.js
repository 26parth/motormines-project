const Admin = require("../models/admin-model");
const User = require("../models/user-model");
const Order = require("../models/order-model");
const jwt = require("jsonwebtoken");
const Product = require("../models/product-model");
const Addabout = require("../models/addabout-model");

// Environment variables: JWT_SECRET, REFRESH_SECRET
const ACCESS_EXPIRES = "7d";
const REFRESH_EXPIRES = "30d";

// ✅ Helper function: generate JWT
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// ✅ Example usage (admin login ke time):
const token = generateToken({ id: admin._id }, process.env.JWT_SECRET, "7d");

// ===============================
// 🔐 ADMIN LOGIN
// ===============================
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const payload = { id: admin._id, role: "admin" };

    const accessToken = generateToken(payload, process.env.ADMIN_JWT_SECRET, ACCESS_EXPIRES);
    const refreshToken = generateToken(payload, process.env.REFRESH_SECRET, REFRESH_EXPIRES);

    // ✅ Set cookies
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
     maxAge: 7 * 24 * 60 * 60 * 1000

    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    // ✅ Send response back
    return res.json({
      success: true,
      message: "Admin logged in successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Server error during admin login" });
  }
};


// ===============================
// 🔄 REFRESH TOKEN
// ===============================
exports.refreshToken = (req, res) => {
  try {
    const rtoken = req.cookies?.refresh_token;
    if (!rtoken) return res.status(401).json({ success: false, message: "No refresh token" });

    const decoded = jwt.verify(rtoken, process.env.REFRESH_SECRET);
    const payload = { id: decoded.id, role: "admin" };
    const newAccessToken = generateToken(payload, process.env.ADMIN_JWT_SECRET, ACCESS_EXPIRES);


    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000

    });

    return res.json({ success: true, message: "Access token refreshed" });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Refresh failed" });
  }
};

// ===============================
// 🚪 LOGOUT
// ===============================
// 🚪 LOGOUT
exports.logout = (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.json({ success: true, message: "Admin logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, message: "Server error during logout" });
  }
};

// ===============================
// 👥 ADMIN → FETCH ALL USERS
// ===============================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    console.error("Admin getAllUsers error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// ===============================
// 🧾 ADMIN → FETCH ALL ORDERS
// ===============================
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullname email")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Admin getAllOrders error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
// ===============================
// 📦 ADMIN → FETCH ALL PRODUCTS
// ===============================
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error("Admin getAllProducts error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

// ===============================
// 📦 ADMIN → ADD PRODUCT
// ===============================
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body;
    if (!name || !price || !image) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }
    const newProduct = await Product.create({ name, description, price, stock, image, category });
    res.json({ success: true, message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Admin addProduct error:", err);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

// ===============================
// 📦 ADMIN → UPDATE PRODUCT
// ===============================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.json({ success: true, message: "Product updated successfully", product });
  } catch (err) {
    console.error("Admin updateProduct error:", err);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

// ===============================
// 📦 ADMIN → DELETE PRODUCT
// ===============================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Admin deleteProduct error:", err);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};


// About.jsx mai jo pehle 4 product hai iska code 


// ===============================
// 📦 ADDABOUT (Public + Admin)
// ===============================

// Public: get all About features (for About.jsx)
exports.getAddaboutPublic = async (req, res) => {
  try {
    const features = await Addabout.find().sort({ createdAt: -1 });
    return res.json({ success: true, features });
  } catch (err) {
    console.error("Get Addabout (public) error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch addabout" });
  }
};

// Admin: get all
exports.getAllAddabout = async (req, res) => {
  try {
    const features = await Addabout.find().sort({ createdAt: -1 });
    return res.json({ success: true, features });
  } catch (err) {
    console.error("Get Addabout (admin) error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch addabout" });
  }
};

// Admin: add
exports.addAddabout = async (req, res) => {
  try {
    const { title, description, image, path } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title required" });

    const newAbout = await Addabout.create({
      title,
      description: description || "",
      image: image || "",
      path: path || "/",
    });

    return res.status(201).json({ success: true, feature: newAbout });
  } catch (err) {
    console.error("Add addabout error:", err);
    return res.status(500).json({ success: false, message: "Failed to add addabout" });
  }
};

// Admin: update
exports.updateAddabout = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Addabout.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, feature: updated });
  } catch (err) {
    console.error("Update addabout error:", err);
    return res.status(500).json({ success: false, message: "Failed to update addabout" });
  }
};

// Admin: delete
exports.deleteAddabout = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Addabout.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("Delete addabout error:", err);
    return res.status(500).json({ success: false, message: "Failed to delete addabout" });
  }
};