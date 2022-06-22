const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const md5 = require("md5");

const authPassword = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Hmm.. those details don't match our records." });


		//const validPassword = await md5.compare(			req.body.password,			user.password		);
		validPassword = await (md5(req.body.password) == user.password);

		if (!validPassword)
			return res.status(401).send({ message: "Hmm.. those details don't match our records." });

		const verid = await User.findOne({ "verified": { $exists: true } })

		if (verid) {
			if (user.verified == false) {
				let token = await Token.findOne({ userId: user._id });
				if (!token) {
					token = await new Token({
						userId: user._id,
						token: crypto.randomBytes(32).toString("hex"),
					}).save();
					const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
					await sendEmail(user.email, "Verify Email", url);
				}

				return res
					.status(400)
					.send({ message: "A verification link has been sent to your email address." });
			}
		}
		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "Logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


module.exports = { authPassword, validate };
