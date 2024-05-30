const express = require("express");
const router = new express.Router();
const {sendEmail} = require("../controller/sendEmail");
router.post("/sendEmail",sendEmail)
module.exports = router;