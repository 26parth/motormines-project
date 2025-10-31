const express = require('express');
const router = express.Router();

router.get("/", function (req,res) {   // yaha ham only ( / ) de rahe hai kyu ki app.js mai ( /owners ) hamne pehle se define kiya hai 
    res.send("Main Hu ownerRouter");
});

module.exports = router;