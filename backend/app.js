const express = require('express');
const app = express();
const cors = require('cors');  // 👈 ADD THIS //without relaod data lane ke liye !
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require("./config/mongoose-connection");
require("dotenv").config();
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const paymentRouter = require("./routes/paymentRouter");
const orderRouter = require("./routes/orderRouter");
const cartRoutes = require("./routes/cartRouter");
const adminRouter = require("./routes/adminRouter"); // 👈 Admin router hai bro !!!
const featureRouter = require("./routes/featureRouter");
// 🧩 Middlewares
// const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",  // 👈 React frontend origin
    credentials: true,                 // 👈 allow cookies + auth
  })
); // 👈 Allow frontend (React) to call backend

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 🏠 Test route
app.get("/", (req, res) => {
  res.send("Mai hu app.js 😄");
});

// 📦 Routes
app.use("/users", usersRouter);  // yaha users likha hai isliye hame users ke koy bhi route par jana hai to direct wahi likho means ki users/register nahi only /register bro Matlab agar koi URL /users/... se start ho rahi hai →jao usersRouter file me dekho uska next route kya hai!

app.use("/products", productsRouter);

// payment routes hai bro ye !!
app.use("/payment", paymentRouter);

app.use("/api", orderRouter);

app.use("/cart", cartRoutes);

// 👑 Admin routes
app.use("/api/admin", adminRouter);  // ✅ All admin auth routes like login, refresh, logout

// About.jsx mai jo 4 product hai use change karne ke liye !!
app.use("/api/features", featureRouter);


// 🚀 Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
