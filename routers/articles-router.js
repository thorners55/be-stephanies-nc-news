const express = require("express");
const articlesRouter = express.Router();
const { getArticle } = require("../controllers/articles-controller.js");

articlesRouter.route("/").get(getArticle);
articlesRouter.route("/:article_id").get(getArticle);

module.exports = { articlesRouter };
