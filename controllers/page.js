exports.renderProfile = (req, res) => {
    console.log("controllers/page/profile-----", user);
    res.render("profile", {title: "profile"});
}

exports.renderJoin = (req, res) => {
    const user = req.user;
    console.log("controllers/page/join------", user);
    res.render("join", {title: "join"});
};

exports.renderMain = (req, res, next) => {
    const user = req.user;
    console.log("controllers/page/main------", user);
    res.render("index");
};