exports.renderProfile = (req, res) => {
    res.render("profile");
}

exports.renderJoin = (req, res) => {
    res.render("join");
};

exports.renderMain = (req, res, next) => {
    res.render("index");
};