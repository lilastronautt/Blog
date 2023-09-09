const express = require("express");
const app = express();
const helmet = require("helmet");
const userRegRouter = require("./routes/users/registration");
const userLogRouter = require("./routes/users/login");
const cors = require("cors");

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use("/users", userRegRouter);
app.use("/users", userLogRouter);
app.use(cors());

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
