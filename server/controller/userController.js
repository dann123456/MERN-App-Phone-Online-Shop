const router = require("express").Router();
const { User, validate } = require("../models/user");
const { Phone } = require("../models/phone");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const md5 = require('md5');
const ObjectId = require("mongodb").ObjectId;

const verifyUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id }, { verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const verifyEmail = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already exists!" });

		//const salt = await bcrypt.genSalt(Number(process.env.SALT));
		//const hashPassword = await bcrypt.hash(req.body.password, salt);
		//const hashPassword = await crypto.createHash('md5').update(req.body.password).digest("hex");
		const hashPassword = await md5(req.body.password);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "A verification link has been sent to your email address." });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const verifyLink = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id }, { verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const verifyLinkPost = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id }, { verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const editProfile = async (req, res) => {

	User.updateOne({ _id: ObjectId(req.body._id) },
		{ $set: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email } })
		.exec(function (err, comments) {
			if (err) throw err;
			res.json(comments);
		});

};

const changePassword = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id }, { verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const viewProfile = async (req, res) => {

	User.find({ "_id": ObjectId(req.params.id.toString()) })
		.exec(function (err, comments) {
			if (err) throw err;
			res.json(comments);
		});

};

const viewListings = async (req, res) => {

	Phone.find({ "seller": ObjectId(req.params.id.toString()) })
		.exec(function (err, comments) {
			if (err) throw err;
			res.json(comments);
		});

};

const addListings = async (req, res) => {

	const title = req.body.title;
	const brand = req.body.brand;
	const image = req.body.image;
	const stock = req.body.stock;
	const price = parseFloat(req.body.price);
	const seller = req.body.seller;
	const disabled = req.body.disabled;
	const reviews = req.body.reviews;

	const newPhone = new Phone({
		title,
		brand,
		image,
		stock,
		seller,
		price,
		reviews,
		disabled
	});

	newPhone.save();

};

const removeListing = async (req, res) => {

	Phone.deleteOne({ _id: ObjectId(req.params.id) }).exec(function (err, phone) {
		if (err) throw err;
		res.json(phone);
	});


};

const enableListing = async (req, res) => {

	Phone.updateOne({ _id: ObjectId(req.params.id) }, { $set: { disabled: "" } })
		.exec(function (err, phone) {
			if (err) throw err;
			res.json(phone);
		});




};

const disableListing = async (req, res) => {

	Phone.updateOne({ _id: ObjectId(req.params.id) }, { $set: { disabled: "true" } })
		.exec(function (err, phone) {
			if (err) throw err;
			res.json(phone);
		});



};

//Change Password

//  set new password
const changePass = async (req, res) => {

	const hashedPwd = md5(req.body.password).toString()
	User.updateOne({ _id: ObjectId(req.params.id) }, { $set: { password: hashedPwd } })
		.exec(function (err, phone) {
			if (err) throw err;
			res.json(phone);
		});



};


module.exports = { verifyUser, verifyEmail, verifyLink, verifyLinkPost, editProfile, changePassword, viewProfile, viewListings, addListings, removeListing, enableListing, disableListing, changePass };



