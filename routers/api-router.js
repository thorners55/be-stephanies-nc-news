const express = require("express");
const apiRouter = express.Router();
const { topicsRouter } = require("./topics-router.js");
const { usersRouter } = require("./users-router.js");
const { articlesRouter } = require("./articles-router.js");
const { commentsRouter } = require("./comments-router.js");
const { handler405 } = require("../controllers/errors-controller.js");
const endpoints = require("../endpoints.json");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter
  .route("/")
  .get((req, res, next) => {
    res.status(200).send(endpoints);
  })
  .all(handler405);

module.exports = { apiRouter };
