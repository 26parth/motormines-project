const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');  // 👈 ADD THIS //without relaod data lane ke liye !
const db = require("./config/mongoose-connection");

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

// 🧩 Middlewares
app.use(cors()); // 👈 Allow frontend (React) to call backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 🏠 Test route
app.get("/", (req, res) => {
  res.send("Mai hu app.js 😄");
});

// 📦 Routes
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);  // yaha users likha hai isliye hame users ke koy bhi route par jana hai to direct wahi likho means ki users/register nahi only /register bro Matlab agar koi URL /users/... se start ho rahi hai →jao usersRouter file me dekho uska next route kya hai!

app.use("/products", productsRouter);

// 🚀 Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
