
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const {users} = require("../models");

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try{
            const exUser = await users.findOne({
                where: { snsId: profile.id, provider: "kakao"},
            });
            if(exUser){
                done(null, exUser);
            } else {
                const newUser = await users.create({
                    user_type_no: 1,
                    user_id: profile.id,
                    user_pwd: "",
                    user_nm: profile.displayName,
                    user_nick: profile.displayName,
                    user_tel: "",
                    user_birthday: Date.now(),
                    user_email: profile._json?.kakao_account?.email,
                    user_addr: "",
                    user_leave: 1,
                    snsId: profile.id,
                    provider: "kakao",
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};