const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const { users } = require("../models");

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log("user1111---------",user);
        console.log("users1111---------",users);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log("users1111---------",users);
        console.log("ididididi---------",id);
        users.findOne({ where: {id}})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};