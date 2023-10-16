const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../db/db");

router.use(cors());

router.post("/downvote/:blogId", (req, res, next) => {
  const blogId = req.params.blogId;
  db.query(
    "select * from user_blog_downvotes where username = ? and blogId = ?",
    ["lilastronautt", blogId],
    (error, results) => {
      if (!results.length) {
        db.query("CALL IncreaseDownvotes(?)", [blogId], (error, results) => {
          if (error) res.json({ msg: "error" });
          db.query(
            "insert into user_blog_downvotes values(?,?)",
            ["lilastronautt", Number(blogId)],
            (error, results) => {
              db.query(
                "select downvotes from blogs where blogId = ?",
                [blogId],
                (error, results) => {
                  res.json(results);
                }
              );
            }
          );
        });
      }
    }
  );
});

module.exports = router;
