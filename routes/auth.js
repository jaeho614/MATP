const express = require("express");
const passport = require("passport");

const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const {join, login, logout, profile} = require("../controllers/auth");

const router = express.Router();


router.post("/join", isNotLoggedIn, join);

router.post("/login", isNotLoggedIn, login);

router.post("/logout", isLoggedIn, logout);

router.post("/profile", isLoggedIn, profile);

router.get("/kakao", passport.authenticate("kakao"));

router.get("/kakao/callback", passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패",
}), (res, req) => {
    res.redirect("/");
});

router.get('/join', function(req, res, next) {
    res.render('join', { title: 'join' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'login' });
});

router.get("/logout", function(req, res, next) {
    req.session.destroy();
    res.redirect("/");
});

router.get('/profile', function(req, res, next) {
    const user = req.user; 
    console.log(user);
    res.render('profile', { title: 'profile', user });
});

module.exports = router;
