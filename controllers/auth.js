const bcrypt = require("bcrypt");
const passport = require("passport");
const { users } = require("../models");

exports.join = async(req, res, next) => {
    const {id, nick, pwd, name, birthday, phone, email, addr, gender} = req.body;

    try{
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
            user_leave: 1,
        });
        res.json();
    } catch(error) {
        console.error(error);
        return next(error);
    }
}

exports.idChk = async (req, res, next) => {
    const { id } = req.body;
  
    try {
        const exUser = await users.findOne({
            where: { user_id: id },
        });
        if (id === "") {
            res.json({ joined: true, message: "아이디를 입력해 주세요" });            
        } else if (exUser) {
            res.json({ joined: true, message: "이미 사용중인 아이디입니다." });
        } else {
            res.json({ joined: false, message: "사용이 가능한 아이디입니다." });
        }
    } catch (error) {
        console.error(error);
    }
};
  
exports.nickChk = async (req, res, next) => {
    const { nick } = req.body;
  
    try {
        const exUser = await users.findOne({
            where: { user_nick: nick },
        });
        if (exUser) {
            res.json({ joined: true, message: "이미 사용중인 닉네임입니다." });
        } else {
            res.json({ joined: false, message: "사용이 가능한 닉네임입니다." });
        }
    } catch (error) {
        console.error(error);
    }
};

exports.phoneChk = async (req, res, next) => {
    const { phone } = req.body;
  
    try {
        const exUser = await users.findOne({
            where: { user_tel: phone },
        });
        if (exUser) {
            res.json({ joined: true, message: "이미 가입된 전화번호입니다." });
        } else {
            res.json({ joined: false, message: "인증 페이지로 이동" });
        }
    } catch (error) {
        console.error(error);
    }
};

exports.emailChk = async (req, res, next) => {
    const { email } = req.body;
  
    try {
        const exUser = await users.findOne({
            where: { user_email: email },
        });
        if (exUser) {
            res.json({ joined: true, message: "이미 사용중인 이메일입니다." });
        } else {
            res.json({ joined: false, message: "사용이 가능한 이메일입니다." });
        }
    } catch (error) {
        console.error(error);
    }
};

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