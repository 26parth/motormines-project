const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

// ✅ Register user (secure)
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password, contact } = req.body;

    // Basic validation
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fullname, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullname,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      contact: contact || null,
      isadmin: false,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully 🎉",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while registering user",
    });
  }
};

// ✅ Login user (secure)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // 3️⃣ Compare password (bcrypt check)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4️⃣ If login successful
    res.status(200).json({
      success: true,
      message: "Login successful 🎉",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
};
