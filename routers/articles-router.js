const express = require("express");
const articlesRouter = express.Router();
const { getArticle } = require("../controllers/articles-controller.js");
const { handler405 } = require("../controllers/errors-controller.js");

articlesRouter.route("/").get(getArticle);
articlesRouter.route("/:article_id").get(getArticle).all(handler405);

module.exports = { articlesRouter };
