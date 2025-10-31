const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController"); // ✅ dono import kiye

// POST /users/register
router.post("/register", registerUser);

// POST /users/login
router.post("/login", loginUser);

module.exports = router;


// const express = require("express");
// const { body } = require("express-validator");
// const authController = require("../controllers/authController");

// const router = express.Router();

// /**
//  * POST /users/register
//  * body: { fullname, email, password, contact }
//  */
// router.post(
//   "/register",
//   // validation rules
//   [
//     body("fullname").trim().notEmpty().withMessage("Fullname is required"),
//     body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
//     body("password").isLength({ min: 6 }).withMessage("Password min 6 chars")
//   ],
//   authController.register
// );

// module.exports = router;


// // const express = require('express');
// // const router = express.Router();

// // router.get("/", function (req,res) {
// //     res.send("Main Hu userRouter");
// // });

// // module.exports = router;

