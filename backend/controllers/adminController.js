const Admin = require("../models/admin-model");
const User = require("../models/user-model");
const Order = require("../models/order-model");
const jwt = require("jsonwebtoken");
const Product = require("../models/product-model");
const Feature = require("../models/feature-model");

// Environment variables: JWT_SECRET, REFRESH_SECRET
const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "30d";

// Helper: generate JWT
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

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
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
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
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ success: true, message: "Access token refreshed" });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Refresh failed" });
  }
};

// ===============================
// 🚪 LOGOUT
// ===============================
exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.json({ success: true, message: "Logged out successfully" });
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

const Feature = require("../models/feature-model");

// ===============================
// 🌟 ADMIN → FETCH ALL FEATURES
// ===============================
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.json({ success: true, features });
  } catch (err) {
    console.error("Admin getAllFeatures error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch features" });
  }
};

// 🌟 ADD FEATURE
exports.addFeature = async (req, res) => {
  try {
    const { title, image, path } = req.body;
    const newFeature = await Feature.create({ title, image, path });
    res.json({ success: true, feature: newFeature, message: "Feature added successfully" });
  } catch (err) {
    console.error("Admin addFeature error:", err);
    res.status(500).json({ success: false, message: "Failed to add feature" });
  }
};

// 🌟 UPDATE FEATURE
exports.updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Feature.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, feature: updated, message: "Feature updated successfully" });
  } catch (err) {
    console.error("Admin updateFeature error:", err);
    res.status(500).json({ success: false, message: "Failed to update feature" });
  }
};

// 🌟 DELETE FEATURE
exports.deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;
    await Feature.findByIdAndDelete(id);
    res.json({ success: true, message: "Feature deleted successfully" });
  } catch (err) {
    console.error("Admin deleteFeature error:", err);
    res.status(500).json({ success: false, message: "Failed to delete feature" });
  }
};


//About.jsx mai product show karane kai liye 
// ===============================
// 📦 Get All Features (Public)
// ===============================
exports.getFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.json({ success: true, count: features.length, features });
  } catch (err) {
    console.error("Get Features error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch features" });
  }
};

// ===============================
// ➕ Add New Feature (Admin only)
// ===============================
exports.addFeature = async (req, res) => {
  try {
    const { title, description, image, path } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title required" });

    const newFeature = await Feature.create({ title, description, image, path });
    res.status(201).json({ success: true, feature: newFeature });
  } catch (err) {
    console.error("Add Feature error:", err);
    res.status(500).json({ success: false, message: "Failed to add feature" });
  }
};

// ===============================
// ✏️ Update Feature (Admin only)
// ===============================
exports.updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Feature.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Feature not found" });
    res.json({ success: true, feature: updated });
  } catch (err) {
    console.error("Update Feature error:", err);
    res.status(500).json({ success: false, message: "Failed to update feature" });
  }
};

// ===============================
// 🗑️ Delete Feature (Admin only)
// ===============================
exports.deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Feature.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Feature not found" });
    res.json({ success: true, message: "Feature deleted" });
  } catch (err) {
    console.error("Delete Feature error:", err);
    res.status(500).json({ success: false, message: "Failed to delete feature" });
  }
};