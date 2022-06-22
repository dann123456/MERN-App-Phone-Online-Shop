const express = require("express");
const router = express.Router();
const { allPhones, onePhone, bestSeller, soldOut, searchPhone, postReview, getComments, checkOut } = require('../controller/phoneController');

// 

router.route("/products").get(allPhones);

router.route("/product/:id").get(onePhone);

router.route("/bestsellers").get(bestSeller);

router.route("/soldoutsoon").get(soldOut);

router.route("/search").get(searchPhone);

router.post("/review/:id", postReview);

router.route("/comments/:id").get(getComments);

router.post("/checkout", checkOut);


module.exports = router;