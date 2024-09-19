const multer = require("multer");
const path = require("path");
// set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, "image-" + Date.now() + path.extname(file.originalname));
  },
});
// Initialize upload
const upload = multer({ storage: storage });

module.exports = upload;
