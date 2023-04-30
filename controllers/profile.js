const { users } = require("../models");

exports.profile = async (req, res, next) => {
    const {tel, addr} = req.body;
    const {id} = req.params;
    try {
        await users.update({
            user_tel: tel,
            user_addr: addr
        }, {
            where: {user_id: id} 
        });
        return res.redirect(`/profile/${id}`);
    } catch(error) {
        console.error(error);
    }
};