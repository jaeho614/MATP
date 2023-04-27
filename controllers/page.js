exports.renderProfile = (req, res) => {
    res.render("profile", {title: "profile"});
}

exports.renderJoin = (req, res) => {
    res.render("join", {title: "join"});
};

exports.renderLogin = (req, res) => {
    res.render("login", {title: "login"});
};

exports.renderMain = (req, res, next) => {
    res.render("index", {title: "MATP"});
};
