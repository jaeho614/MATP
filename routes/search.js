var express = require('express');
var router = express.Router();
const {Op} = require("sequelize");
const {stores, board} = require("../models");
const multer = require("multer");
const path = require("path");

/* GET home page. */
router.get('/', async(req, res, next) =>{
    try{
        const PAGE_SIZE = 12;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const offset = (page - 1) * PAGE_SIZE;

        const {query} = req.query;

        const count = await stores.count({
            where: {
                [Op.or]: [
                    {
                        store_nm: {
                            [Op.like]: `%${query}%`,
                        },
                    },
                    {
                        rgn_no: {
                            [Op.like]: `${query}`,
                        },
                    },
                ],
            },
        });

        const totalPages = Math.ceil(count / PAGE_SIZE);

        const search = await stores.findAll({
            nest: true,
            raw : true,
            order: [
                ["store_no", "DESC"]
            ],
            offset,
            limit: PAGE_SIZE,
            where:{
                [Op.or]: [
                    {
                        store_nm: {
                            [Op.like]: `%${query}%`
                        }
                    },{
                        rgn_no: {
                            [Op.like]: `${query}`
                        }
                    }
                ]
            }
        });
        res.render("search",
            {
                store:search,
                totalPages,
                currentPage: page,
                query,
            });
    } catch(error){
        console.error(error);
        next(error);
    }
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
    const {rgn_no, store_nm, store_addr, store_detail_addr, store_tel, store_content, store_wkd_time, store_wknd_time, store_break_time} = req.body;

    try{
        const files = [];
        for(const file of req.files){
            files.push({ filename: file.filename, url: `/img/${file.filename}` });
        }
        const upload = await stores.create({
            rgn_no: rgn_no,
            store_nm: store_nm,
            store_addr: store_addr,
            store_detail_addr: store_detail_addr,
            store_tel: store_tel,
            store_content: store_content,
            store_wkd_time: store_wkd_time,
            store_wknd_time: store_wknd_time,
            store_break_time: store_break_time,
            store_del: 1,
            img: files,
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