const express = require("express");
const passport = require("passport");

const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const {join, login, logout, idChk, nickChk, emailChk, phoneChk, exUserChk} = require("../controllers/auth");

const router = express.Router();

router.post("/join", isNotLoggedIn, join);
router.post("/idChk/join", idChk);
router.post("/nickChk/join", nickChk);
router.post("/phoneChk/join", phoneChk);
router.post("/emailChk/join", emailChk);

router.post("/login", isNotLoggedIn, exUserChk, login);

router.post("/logout", isLoggedIn, logout);

router.get("/kakao", passport.authenticate("kakao"));

router.get("/kakao/callback", passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패",
}), (req, res) => {
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

module.exports = router;
