const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/create-cod", protect, orderController.createCodOrder);
router.get("/", protect, orderController.getUserOrders);

module.exports = router;
