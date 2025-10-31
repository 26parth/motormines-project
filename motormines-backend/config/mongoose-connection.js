const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");       // jab debug use karna ho tab use kare !! ye console log nahi karta kyu ki console log karne se hamare code mai bug aati hai ham use comment out karna bhul jaate hai ya ham apna project live,ya dusre ko dete hai to tab hamara console.log uske pc mai bhi chalta hai or peocess slow hota hai to iske liye ham debug ka use karte hai 


mongoose.connect(`${config.get("MONGODB_URI")}/motormines`)
.then(function () {
    dbgr("connected bro !!");
    // console.log("connected bro !!");
})
.catch(function (err) {
    dbgr(err);
    // console.log(err);
})
module.exports = mongoose.connection;