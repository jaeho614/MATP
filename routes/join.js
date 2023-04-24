const express = require('express');
const router = express.Router();
const {users} = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('join', { title: 'join' });
});

router.post("/", async (req, res, next) => {
  try {
    await users.create({
        user_type_no: 1,
        user_id: req.body.id,
        user_pwd: req.body.pwd,
        user_nm: req.body.name,
        user_nick: req.body.nick,
        user_tel: req.body.phone,
        user_gender: req.body.gender,
        user_birthday: req.body.birthday,
        user_email: req.body.email,
        user_addr: req.body.addr,
        created_at: 1,
        user_leave: 1,
      });
      return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

