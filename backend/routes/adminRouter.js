const express = require("express");
const { adminLogin, refreshToken, logout } = require("../controllers/adminController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/login", adminLogin);
router.post("/refresh", refreshToken);
router.post("/logout", adminMiddleware, logout);

module.exports = router;
