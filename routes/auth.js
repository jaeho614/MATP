const express = require("express");
const passport = require("passport");

const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const {join, login, logout} = require("../controllers/auth");

const router = express.Router();



router.post("/join", isNotLoggedIn, join);

router.post("/login", login);

router.post("/logout", isLoggedIn, logout);

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

module.exports = router;
