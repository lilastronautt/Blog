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
        if (error) {
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "ok" });
        }
      }
    );
  } else {
    res.json({ msg: "error" });
  }
});

router.get("/usernames", (req, res, next) => {
  db.query("SELECT username FROM users", [], (error, results, fields) => {
    if (!error) res.json(results);
    else res.json("Something went wrong");
  });
});

module.exports = router;
