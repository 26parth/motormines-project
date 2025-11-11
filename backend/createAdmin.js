const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/admin-model");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const createAdmin = async () => {
  try {
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new Admin({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    await admin.save();
    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

createAdmin();