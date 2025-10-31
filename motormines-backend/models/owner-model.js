const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/motormines");

const ownerSchema = mongoose.Schema({

    fullname: String,
    email: String,
    password: String,
    isadmin: Boolean,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin:Number,

});

module.exports = mongoose.model("owner", ownerSchema);