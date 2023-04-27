const express = require("express");
const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const {renderProfile, renderJoin, renderMain, renderLogin} = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get("/profile", isLoggedIn, renderProfile);
router.get("/login", isNotLoggedIn, renderLogin);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;