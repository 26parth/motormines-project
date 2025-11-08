const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [
        {
            productId: { type: String, required: true },  // ✅ simple string ID
            title: String,
            price: Number,
            img: String,
            quantity: { type: Number, default: 1 },
        },
    ],
});

module.exports = mongoose.model("cart", cartSchema);
