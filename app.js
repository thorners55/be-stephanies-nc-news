const express = require("express");
const app = express();
const { apiRouter } = require("./routers/api-router.js");
const { handler400 } = require("./controllers/errors-controller.js");

app.use("/api", apiRouter);

app.use("/", handler400);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "500 Internal Server Error" });
});

module.exports = app;
