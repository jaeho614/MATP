const bcrypt = require("bcrypt");
const passport = require("passport");
const { users } = require("../models");

exports.join = async(req, res, next) => {
    const {id, nick, pwd, name, birthday, phone, email, addr, gender} = req.body;
    try{
        const exUser = await users.findOne({ where: {user_id: id}});
        if (exUser) {
            console.log("이미 존재하는 아이디입니다.");
            return res.redirect("/join?error=exist");
        };
        const hash = await bcrypt.hash(pwd, 12);
        await users.create({
            user_type_no: 1,
            user_id: id,
            user_pwd: hash,
            user_nm: name,
            user_nick: nick,
            user_tel: phone,
            user_gender: gender,
            user_birthday: birthday,
            user_email: email,
            user_addr: addr,
            created_at: 1,
            user_leave: 1,
        });
        return res.redirect("/");
    } catch(error) {
        console.error(error);
        return next(error);
    }
}

exports.login = (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/");
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
};

exports.profile = async (req, res, next) => {
    locals.user = req.body;
    console.log("11111", req.body);
    console.log("22222", req.user);
    // const {id, nick, pwd, name, birthday, phone, email, addr, gender} = req.body;
    // try{

    //     res.render("/profile",{id});

    // } catch (error) {
    //     console.error(error);
    //     next(error);
    // }
    res.redirect("/profile");
};