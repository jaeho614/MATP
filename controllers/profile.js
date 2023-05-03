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
        next(error);
    };
};

exports.withdraw = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
      await users.destroy({ where: { user_id: id } });
      return res.redirect("/");
    } catch (error) {
      console.error(error);
    }
  };
