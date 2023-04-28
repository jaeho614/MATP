const express = require("express");
const passport = require("passport");

const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const {join, login, logout, profile} = require("../controllers/auth");

const router = express.Router();

router.post("/join", isNotLoggedIn, join);

router.post("/login", isNotLoggedIn, login);

router.post("/logout", isLoggedIn, logout);

// router.patch("/profile", isLoggedIn, profile);

router.get("/kakao", passport.authenticate("kakao"));

router.get("/kakao/callback", passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패",
}), (res, req) => {
    res.redirect("/");
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.render('join', { title: 'join' });
});

router.get('/login', isNotLoggedIn, (req, res, next) => {
    res.render('login', { title: 'login' });
});

router.get("/logout", (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    const user = req.user;
    res.render('profile', { title: 'profile', user });
});

module.exports = router;
