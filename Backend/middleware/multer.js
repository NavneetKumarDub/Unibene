
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.baseUrl.includes("technology")) {
      cb(null, "./Uploads/technology");
    } else if (req.baseUrl.includes("course")) {
      cb(null, "./Uploads/course");
    } else {
      cb(null, "./Uploads");
    }
  },

  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      if (err) return cb(err);
      const filename =
        name.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const upload = multer({ storage });

module.exports = upload;