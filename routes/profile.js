const express = require("express");

const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const {profile} = require("../controllers/profile");

const router = express.Router();


router.post("/:id", isLoggedIn, profile);

router.get('/:id', isLoggedIn, (req, res, next) => {
    const user = req.user;
    res.render('profile', { title: 'profile', user});
});

module.exports = router;