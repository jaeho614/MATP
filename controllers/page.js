exports.renderProfile = (req, res) => {
    res.render("profile", {title: "profile"});
}

exports.renderJoin = (req, res) => {
    res.render("join", {title: "join"});
};

exports.renderMain = (req, res, next) => {
    const user = req.user;
    console.log("controllers/page.js------",user);
    res.render("index");
    console.log(req.body, user);
};

