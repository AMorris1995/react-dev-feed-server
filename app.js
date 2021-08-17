const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const auth_routes = require("./routes/auth-routes");

app.use("/api", auth_routes);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode).json({ err });
  } else {
    res.status(500).send("Internal server error");
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
