const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/admin-model");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));

const createAdmin = async () => {
  try {
    const existing = await Admin.findOne({ email: "admin@example.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new Admin({
      name: "parth",
      email: "parth@com",
      password: "111111", // will be hashed automatically
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

createAdmin();
