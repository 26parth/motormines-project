const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// 🧩 Public Routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

// 🧩 Protected Routes (login required)
router.get("/profile", protect, (req, res) => {
  res.json({ success: true, user: req.user }); // ✅ closed properly
});

router.put("/profile", protect, userController.updateProfile); // ✅ moved outside, correct place
router.put("/address", protect, userController.updateAddress);

module.exports = router;
