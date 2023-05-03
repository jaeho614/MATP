const { board } =require("../models");

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

exports.renderBoard = async (req, res, next) => {
    try {
        const PAGE_SIZE = 5;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const offset = (page - 1) * PAGE_SIZE;
        const total = await board.count();
        const totalPages = Math.ceil(total / PAGE_SIZE);

        const boards = await board.findAll({
            nest: true,
            raw : true,
            order: [
                ["board_no", "DESC"],
            ],
            offset,
            limit: PAGE_SIZE,
        });
        return res.render("board", {
            boards,
            // imgObject,
            title: "커뮤니티",
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};