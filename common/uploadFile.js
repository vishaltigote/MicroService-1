const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/csv");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "text/csv") {
      filetype = "csv";
    }
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
