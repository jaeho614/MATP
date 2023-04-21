const express = require("express");
const {sequelize} = require("./models");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use('/', indexRouter);
app.use('/users', usersRouter);

sequelize.sync({force: false})
    .then(() => {
        console.log("데이터베이스 연결 성공!");
    })
    .catch((err) => {
        console.log(err);
    });


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).sendFile(path.join(__dirname, "/error.html"));
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"),"포트 대기중...");
});



module.exports = app;
