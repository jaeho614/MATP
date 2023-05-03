const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {board} = require('../models');
const {isLoggedIn} = require("../middlewares");

const router = express.Router();

// 목록
router.get('/create', isLoggedIn, (req, res) => {
    const id = req.user.user_id
    res.redirect(`/board/create/${id}`);
});

router.get('/create/:id', isLoggedIn, (req, res) => {
    res.render('create');
});

//상세페이지
router.get('/detail/:board_no', async (req, res) => {
    const board_no = req.params.board_no;
    const boards = await board.findOne({
        where: {board_no}
    })
     res.render("detail",{boards});
});

// 게시글 수정
router.get('/update/:board_no', isLoggedIn, async(req, res) => {
    const boardNo = req.params.board_no;
    const boards = await board.findOne({
        where: {board_no: boardNo}
    })
    res.render("update", {boards});
});

router.post('/update/:board_no', async(req, res) => {
    const boardNo = req.params.board_no;
    const {board_title, board_content} = req.body;

    try{
        const boards = await board.update({
            board_title: board_title,
            board_content: board_content,
        },{
            where: {board_no: boardNo}
        });
        if(boards === null){
            console.log("게시물 수정 에러!");
            res.status(400).json({"msg":"uploadError"});
        }else{
            console.log("게시물 수정!");
            return res.redirect(`/board/detail/${boardNo}`);
        };
    }catch(error){
        console.error(error);
        res.status(500).json({"msg":error});
    };
});

//게시글 삭제
router.post('/delete/:board_no', isLoggedIn, async (req, res) => {
    const boardNo = req.params.board_no;

    await board.destroy({
        where: { board_no: boardNo }
    });
    res.redirect('/board');
});

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const fileName = `${path.basename(
                file.originalname,
                ext
            )}_${Date.now()}${ext}`;
            done(null, fileName);
        }
    }),
    fileFilter : (req, file, cb) => {
        const typeArray = file.mimetype.split('/');
        const fileType = typeArray[1];

        if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
            req.fileValidationError = null;
            cb(null, true);
        } else {
            req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
            cb(null, false)
        };
    },
    limits : { fileSize: 5 * 1024 * 1024 },
});


router.post("/multiple-upload", upload.array('files'), async(req, res) => {
    const {title, content} = req.body;

    try{
        const files = [];
        for(const file of req.files){
            files.push({ filename: file.filename, url: `/img/${file.filename}` });
        };
        const upload = await board.create({
            board_title: title,
            user_no: req.user.user_no,
            board_content: content,
            img:files,
        });
        if(upload === null){
            console.log("게시물 등록 에러!");
            res.status(400).json({"msg":"uploadError"});
        }else{
            console.log("게시물 등록!");
            res.status(200).json({"msg":"uploadSuccess"});
        };
    }catch (error){
        console.error(error);
        res.status(500).json({"msg":error});
    };
});

module.exports = router;