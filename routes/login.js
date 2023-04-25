const express = require("express");
const router = express.Router();
const { users } = require("../models");

router.get("/", (req, res) => {
  res.render("login", { title: "login" });
});
router.post("/", async (req, res, next) => {
  // const {id, password} = req.body;
  try {
    const User = await users.findOne({
      // where: {user_id: req.users && req.users.user_id},
      where: { user_id: req.body.id },
    });
    if (!User) {
      console.log("아이디가 존재하지 않습니다.");
    } else {
      console.log(User.user_id);
      // res.render('index', {userId: User.user_id});
      return res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
