const passport = require('passport');
const {users} = require('../models');
const local = require('./localStrategy');
// const kakao = require('./kakoStrategy');

module.exports = () =>{
    passport.serializeUser((user,done)=>{
        done(null, user.user_id);
    });

    passport.deserializeUser((user_id, done) =>{
        console.log("passport/index", user_id);
        users.findOne({
            where : {user_id},
            attributes: ['user_no','user_id','user_email'],
            }
        )
        .then(user => done(null, user))
        .catch( err => done(err));
    });

    local();
    // kakao();
}