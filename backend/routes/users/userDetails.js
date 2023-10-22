const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../db/db");
const multer = require("multer");

router.use(cors());
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

router.post("/userdetails", upload.single("profilePic"), (req, res, next) => {
  if (!req.body) res.json({ msg: "error" });
  else {
    const profilePicData = req.file.buffer;
    const dob = new Date(req.body.dob);
    const isoDob = dob.toISOString().split("T")[0];
    db.query(
      "insert into userdetails values(?,?,?,?,?,?,?,?)",
      [
        req.body.username,
        req.body.name,
        profilePicData,
        req.body.bio,
        isoDob,
        req.body.gender,
        req.body.mobileNum,
        req.body.emailAddress,
      ],
      (error, results) => {
        console.log(error);
        if (error) res.json({ msg: "error" });
        else {
          db.query(
            "update users set hasdetails = 1 where username = ?",
            [req.body.username],
            (error, results) => {
              if (error) res.json({ msg: "error" });
            }
          );
          res.json({ msg: "ok" });
        }
      }
    );
  }
});

module.exports = router;
