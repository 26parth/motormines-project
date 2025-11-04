const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// 🧩 Public Routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

router.put("/address", protect, userController.updateAddress); // adress store karne ke liye 
// 🧩 Protected Route (only logged-in user can access)
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user, // middleware se milta hai
  });
});
router.put("/address", protect, userController.updateAddress);


module.exports = router;
