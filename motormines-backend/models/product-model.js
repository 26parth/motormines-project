const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/motormines"); hamne userSchema mai use kar liya hai !!

const productSchema = mongoose.Schema({

    image: String,
    name: String,
    price: String,
    discount: {
        type: Number,
        default: []
    },

});

module.exports = mongoose.model("product", productSchema);