const router = require("express").Router();
const md5 = require("md5");
const { sendPass, verifyPass, newPass } = require("../controller/passwordresetController");

// send password link
router.post("/", sendPass);

// verify password reset link
router.get("/:id/:token", verifyPass);

//  set new password
router.post("/:id/:token", newPass);

// const url = `http://localhost:8080/api/users/profile/pass/${userId._id}`;
module.exports = router;