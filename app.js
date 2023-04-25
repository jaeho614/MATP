const express = require("express");
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const session = require("express-session");
const multer = require("multer");
const morgan = require("morgan");
const fs = require("fs");
const passport = require("passport");
const passportConfig = require("./passport");
dotenv.config();
passportConfig();

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const joinRouter = require("./routes/join");
const profileRouter = require("./routes/profile");
const searchRouter = require("./routes/search");
const authRouter = require("./routes/auth");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/join", joinRouter);
app.use("/profile", profileRouter);
app.use("/search", searchRouter);
app.use("/auth", authRouter);

app.use("/", express.static(path.join(__dirname, "public")));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공!");
  })
  .catch(err => {
    console.log(err);
  });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).sendFile(path.join(__dirname, "/error.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "포트 대기중...");
});

module.exports = app;
