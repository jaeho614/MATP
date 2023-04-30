const express = require("express");
const {isNotLoggedIn} = require("../middlewares");
const { renderJoin, renderMain, renderLogin} = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get("/login", isNotLoggedIn, renderLogin);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;