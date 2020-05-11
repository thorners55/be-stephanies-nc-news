const express = require("express");
const app = express();

const { apiRouter } = require("./routers/api-router.js");
const {
  handler404,
  handleInternalErrors,
  handlePSQLErrors,
  handleCustomErrors,
} = require("./controllers/errors-controller.js");

app.use(express.json());
app.use("/api", apiRouter);

app.route("/*").all(handler404);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalErrors);

module.exports = app;
