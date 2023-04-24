var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('join_ok', { title: 'join_ok' });
  console.log("asdasd");
});


module.exports = router;