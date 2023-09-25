const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../db/db");
const multer = require("multer");

router.use(cors());
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

router.post("/userdetails", upload.single("profilePic"), (req, res, next) => {
  console.log(req.body.profilePic);
  if (!req.body) res.json({ msg: "error" });
  else {
    const profilePicData = req.file.buffer;
    db.query(
      "insert into userdetails values(?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.mobileNum,
        req.body.name,
        req.body.socialMedia?.ig ?? "ass",
        req.body.socialMedia?.fb ?? "asss",
        req.body.gender,
        req.body.bio,
        profilePicData,
        req.body.emailAddress,
        "2023-01-01",
        "ut@gmail.com",
      ],
      (error, results) => {
        console.log(error);
        if (error) res.json({ msg: "error" });
        else {
          res.json({ msg: "ok" });
        }
      }
    );
  }
});

module.exports = router;
