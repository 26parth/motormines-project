// const bcrypt = require("bcryptjs");
// const { validationResult } = require("express-validator");
// const User = require("../models/user-model");

// // POST /users/register
// exports.register = async (req, res) => {
//   // validation errors from express-validator
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success:false, message: "Validation failed", errors: errors.array() });
//   }

//   try {
//     const { fullname, email, password, contact } = req.body;

//     // basic required check
//     if (!fullname || !email || !password) {
//       return res.status(400).json({ success:false, message: "fullname, email and password are required" });
//     }

//     // check duplicate
//     const existing = await User.findOne({ email: email.toLowerCase().trim() });
//     if (existing) {
//       return res.status(409).json({ success:false, message: "Email already registered" });
//     }

//     // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       fullname,
//       email: email.toLowerCase().trim(),
//       password: hashed,
//       contact: contact || null,
//       isadmin: false
//     });

//     await newUser.save();

//     // respond (do NOT send password back)
//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: { id: newUser._id, fullname: newUser.fullname, email: newUser.email }
//     });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ success:false, message: "Server error" });
//   }
// };
