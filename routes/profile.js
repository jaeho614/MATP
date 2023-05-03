const express = require("express");
const multer = require("multer");
const path = require("path");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { profile, withdraw } = require("../controllers/profile");
const { users } = require("../models");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "public/images/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
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
    }
},
  limits: { fileSize: 5 * 1024 * 1024},
});

router.post("/:id", isLoggedIn, profile);
router.post("/image/:id", isLoggedIn, upload.single("myPhoto"), async (req, res) => {
  const id = req.user.user_id;
  const img = req.file.filename;
  try{
    await users.update({
      user_img: img
    }, {
      where: {user_id: id}
    });
    return res.redirect(`/profile/${id}`);
  }catch(error){
    console.error(error);
  }
});
router.post("/:id/withdraw", isLoggedIn, withdraw);

router.get("/:id", isLoggedIn, (req, res, next) => {
  const user = req.user;
  res.render("profile", { title: "profile", user });
});

router.get("/:id/withdraw", isLoggedIn, (req, res, next) => {
  const user = req.user;
  res.render("withdraw", { title: "회원탈퇴", user });
});

module.exports = router;