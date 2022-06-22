const router = require("express").Router();
const { verifyUser, verifyEmail, verifyLink, editProfile, viewProfile, viewListings, addListings, removeListing, enableListing, disableListing, changePass } = require('../controller/userController');

router.post("/", verifyEmail);

router.get('/profile', verifyLink);

router.post("/profile/edit/:id", editProfile);

router.post("/profile/:id", viewProfile);

// router.post('/profile', editProfile);

router.route("/profile/:id").get(viewProfile);

router.get("/:id/verify/:token/", verifyUser);

router.get("/profile/phones/:id", viewListings);

router.post("/profile/phones/:id", addListings);

router.post("/profile/phones/remove/:id", removeListing);

router.post("/profile/phones/enable/:id", enableListing);

router.post("/profile/phones/disable/:id", disableListing);

// Change Password
router.post("/profile/pass/:id", changePass);

module.exports = router;
