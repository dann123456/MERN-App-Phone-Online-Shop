const { string } = require('joi');
const mongoose = require('mongoose');
const { User, validate } = require("../models/user");

const phoneSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "imageurl"
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: User,
        // type: String,
        // autopopulate: true
    },
    price: {
        type: Number,
        required: true
    },
    reviews: [{ reviewer: { type: mongoose.Types.ObjectId, ref: User }, rating: { type: Number }, comment: { type: String } }],
    disabled: { type: String, required: false, default: "" }

});

const Phone = mongoose.model("phone", phoneSchema, "phones");
module.exports = { Phone };