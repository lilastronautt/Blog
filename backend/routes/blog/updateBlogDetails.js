const express = require("express");
const cors = require("cors");
const db = require("../db/db");
const router = express.Router();
const multer = require("multer");

router.use(cors());

// Configure multer to handle both forms of image data
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

router.post("/updateblogdetails", upload.single("img"), (req, res, next) => {
  if (!req.body) {
    return res.json({ msg: "error" });
  }

  console.log(req.body.img);
  const title = req.body.title;
  const textCont = req.body.textCont;
  const blogId = req.body.blogId;

  let img; // To store the image data

  const currentTimestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  if (req.file) {
    img = req.file.buffer;
    db.query(
      `UPDATE blogs
        SET
          title = ?,
          image = ?,
          content = ?,
          timestamp = ?
        WHERE
          blogId = ?`,
      [title, img, textCont, currentTimestamp, blogId],
      (error, results) => {
        console.log(error);
        if (error) {
          return res.json({ msg: "error", error: error.message });
        }
        return res.json({ msg: "okay" });
      }
    );
  } else {
    db.query(
      `UPDATE blogs
        SET
          title = ?,
        
          content = ?,
          timestamp = ?
        WHERE
          blogId = ?`,
      [title, textCont, currentTimestamp, blogId],
      (error, results) => {
        console.log(error);
        if (error) {
          return res.json({ msg: "error", error: error.message });
        }
        return res.json({ msg: "okay" });
      }
    );
  }
});

module.exports = router;
