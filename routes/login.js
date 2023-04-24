const express = require('express');
const router = express.Router();
const {users} = require("../models");

router.get("/", (req, res) => {
    res.render("login", {title: "title"});
});
router.post('/', async (req, res, next) => {
    try {
        console.log("로그인 됐어요~");
    } catch(error) {
        console.error(error);
        next(error);
    };

    // try {
    //     // const User = await users.findOne({
    //     //     where: {id: req.user && req.user.id || null},
    //     //     include: {
    //     //         model: users,
    //     //     },
    //     // });
    //     // res.render('/', {User});
    // } catch (error) {
    //     console.error(error);
    //     next(error);
    // };
    return res.redirect("/");
});


module.exports = router;
