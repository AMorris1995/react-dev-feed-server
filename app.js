const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const auth_routes = require("./routes/auth-routes");
const post_routes = require("./routes/post-routes");
const user_routes = require("./routes/user-routes");
app.use("/api", post_routes);
app.use("/api", auth_routes);
app.use("/api", user_routes);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode).json(err.message);
  } else {
    res.status(500).json("Internal server error");
  }
});

mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT);

    console.log("Server online at port", +process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
