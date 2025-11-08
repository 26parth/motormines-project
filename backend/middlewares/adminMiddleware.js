const jwt = require("jsonwebtoken");
const Admin = require("../models/admin-model");

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).json({ success: false, message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin || !admin.isAdmin) return res.status(403).json({ success: false, message: "Admin only" });

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Auth failed" });
  }
};

module.exports = { adminMiddleware };
