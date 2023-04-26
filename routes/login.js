// const express = require('express');
// const router = express.Router();
// const {users} = require("../models");
// const {isLoggedIn, isNotLoggedIn} = require("../middlewares");
// const {join, login, logout} = require("../controllers/auth");
// router.get("/", (req, res) => {
//     res.render("login", {title: "login"});
// });
// // router.post('/', async (req, res, next) => {
// //     const {id} = req.body;
// //     try {
// //         const User = await users.findOne({
// //             // where: {user_id: req.users && req.users.user_id},
// //             where: {user_id: id},
// //         });
// //         if(!User){
// //             console.log("아이디가 존재하지 않습니다.");
// //         } else {
// //             console.log("로그인 성공", id);
// //             return res.redirect("/");
// //         };
// //     } catch(error) {
// //         console.error(error);
// //         next(error);
// //     };
// // });

// router.post("/login", isNotLoggedIn, login);

// module.exports = router;