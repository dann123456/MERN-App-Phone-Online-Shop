const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User, validate } = require("../models/user");

const reviewSchema = new Schema({
    reviewer: { type: String },
    rating: { type: Number },
    comment: { type: String }
}, { _id: false });

const Review = mongoose.model("review", reviewSchema, "reviews");
module.exports = { Review };
