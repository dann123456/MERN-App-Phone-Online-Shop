const express = require("express");
const { Phone } = require("../models/phone");
const { Review } = require("../models/review");
const { User, validate } = require("../models/user");
const { unstable_renderSubtreeIntoContainer } = require("react-dom");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { db } = require("../db.js");
const { callbackPromise } = require("nodemailer/lib/shared");


const allPhones = function (req, res) {

    Phone.find({}).exec(function (err, products) {
        if (err) throw err;
        res.json(products);
    })

};

const onePhone = function (req, res) {
    let myquery = { _id: ObjectId(req.params.id) };

    Phone.findOne(myquery).populate('seller', 'firstname lastname').populate({
        path: 'reviews.reviewer',
        model: User
    }).exec(function (err, products) {
        if (err) throw err;
        res.json(products);
    })

};

const bestSeller = function (req, res) {
    Phone.aggregate([{ $unwind: "$reviews" },
    {
        $group: {
            _id: "$_id",
            title: { $first: "$title" },
            brand: { $first: "$brand" },
            image: { $first: "$image" },
            stock: { $first: "$stock" },
            seller: { $first: "$seller" },
            price: { $first: "$price" },
            reviews: { $first: "$reviews" },
            avgRating: { $avg: "$reviews.rating" },
            count: { $sum: 1 }
        }
    }, { $match: { "count": { $gte: 2 } } }, { $sort: { "avgRating": -1, "title": 1 } }, { $limit: 5 }])
        .exec(function (err, products) {
            if (err) throw err;
            res.json(products);
        })
};

const soldOut = function (req, res) {
    Phone.find({ "stock": { $gte: 1 } }, { "disabled": false })
        .sort({ "stock": 1 })
        .limit(5)
        .exec(function (err, products) {
            if (err) throw err;
            res.json(products);
        })
};


const searchPhone = function (req, res) {
    const q = req.query.q;
    Phone.find({ "title": { $regex: new RegExp(q, "i") } })
        .sort({ "price": 1 })
        .exec(function (err, products) {
            if (err) throw err;
            res.json(products);
        })
};

const postReview = async (req, res) => {

    let myquery = { _id: ObjectId(req.params.id) };

    const reviewer = req.body.reviewer;
    const comment = req.body.comment;
    const rating = req.body.rating;

    const newReview = new Review({
        reviewer,
        rating,
        comment
    });

    console.log(req.params.id);
    console.log(newReview);
    const result = await Phone.updateOne(myquery, { $push: { "reviews": newReview } })

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);

    // Phone.updateOne(myquery, {$set: {"reviews.reviewer" : reviewer.toHexString() }})

};

const getComments = async (req, res) => {

    Phone.aggregate([{ $unwind: "$reviews" }, { $match: { "reviews.reviewer": ObjectId(req.params.id.toString()) } }, { "$replaceRoot": { "newRoot": "$reviews" } }])
        // { "$replaceRoot": { "newRoot": "$reviews" } }
        .exec(function (err, comments) {
            if (err) throw err;
            res.json(comments);
        });

};

const checkOut = async (req, res) => {

    var list = req.body;

    for (var i = 0; i < list.length; i++) {
        var newQty = Number(list[i].stock) - Number(list[i].qty);
        Phone.updateOne({ _id: ObjectId(list[i]._id.toString()) }, { $set: { stock: newQty } })
            .exec(function (err, comments) {
                if (err) throw err;
                res.json(comments);
            });
    }

};



module.exports = { allPhones, onePhone, bestSeller, soldOut, searchPhone, postReview, getComments, checkOut };
