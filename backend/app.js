const express = require("express");
const app = express();
const helmet = require("helmet");
const userRegRouter = require("./routes/users/registration");
const userLogRouter = require("./routes/users/login");
const userDetailsRouter = require("./routes/users/userDetails.js");
const blogDetailsRouter = require("./routes/blog/blogDetails.js");
const getUserDetails = require("./routes/users/getUserDetails.js");
const getUserAllBlogsDetails = require("./routes/blog/getUserAllBlogsDetails.js");
const getBlogDetailsRouter = require("./routes/blog/getBlogDetails");
const cors = require("cors");

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use("/users", userRegRouter);
app.use("/users", userLogRouter);
app.use("/users", userDetailsRouter);
app.use("/users", getUserDetails);
app.use("/blog", blogDetailsRouter);
app.use("/blog", getUserAllBlogsDetails);
app.use("/blog", getBlogDetailsRouter);

app.use(cors());

app.get("/", (req, res, next) => {
  res.json({ msg: "okay" });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
