const express = require("express");
const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
const {renderProfile, renderJoin, renderMain} = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    console.log("routes.js/page.js---------", req.user);
    next();
});

router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", (req, res, next) => {
    const user = req.user;
    console.log("controllers/page/main------", user);
    res.render("index");
});

module.exports = router;