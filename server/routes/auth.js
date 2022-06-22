const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const md5 = require("md5");
const { authPassword, validate } = require('../controller/authController');

router.post("/", authPassword);

module.exports = router;
