const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../db/db");

router.use(cors());

router.post("/register", (req, res, next) => {
  if (req.body) {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
      "insert into users values(?,?)",
      [username, password],
      (error, results, fields) => {
        console.log(results);
      }
    );
    res.json("ok");
  } else {
    res.json("error");
  }
});

module.exports = router;
