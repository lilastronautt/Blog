const express = require("express");
const router = express.Router();
const db = require("../db/db");
const multer = require("multer");

router.post("/login", (req, res, next) => {
  console.log(req.body);
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    (error, results) => {
      const [data] = results;
      console.log(data);
      if (!data || error || data.password != req.body.password) {
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "ok" });
      }
    }
  );
});

module.exports = router;
