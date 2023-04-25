const express = require('express');
const router = express.Router();
const {users} = require("../models");

router.get("/", (req, res) => {
    res.render("login", {title: "title"});
});
router.post('/', async (req, res, next) => {
    try {
        console.log("로그인 됐어요~");
        // const User = await users.findOne({
        //     // where: {user_id: req.users && req.users.user_id},
        //     where: user_
        // });
        console.log("오 된다", req.body);
        // res.render('/', {User});
    } catch(error) {
        console.error(error);
        next(error);
    };
    // return res.redirect("/");
});


module.exports = router;
