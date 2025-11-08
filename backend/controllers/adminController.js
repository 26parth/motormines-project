const Admin = require("../models/admin-model");
const jwt = require("jsonwebtoken");

// Environment variables: JWT_SECRET, REFRESH_SECRET
const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "30d";

// Helper: generate JWT
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const payload = { id: admin._id, role: "admin" };

    const accessToken = generateToken(payload, process.env.JWT_SECRET, ACCESS_EXPIRES);
    const refreshToken = generateToken(payload, process.env.REFRESH_SECRET, REFRESH_EXPIRES);

    // set httpOnly cookies
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.json({ success: true, message: "Admin logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Refresh access token
exports.refreshToken = (req, res) => {
  try {
    const rtoken = req.cookies?.refresh_token;
    if (!rtoken) return res.status(401).json({ success: false, message: "No refresh token" });

    const decoded = jwt.verify(rtoken, process.env.REFRESH_SECRET);
    const payload = { id: decoded.id, role: "admin" };
    const newAccessToken = generateToken(payload, process.env.JWT_SECRET, ACCESS_EXPIRES);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Refresh failed" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.json({ success: true, message: "Logged out successfully" });
};
