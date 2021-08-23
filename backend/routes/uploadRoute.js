const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ); //extname get extention of the file name
  },
});

function checkFileType(file, cb) {
  const fileType = /jpg|jpeg|png/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  //mimetypehow aka imeg/jpeg/vbfgbfhgh
  const mimetype = fileType.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});
module.exports = router;
