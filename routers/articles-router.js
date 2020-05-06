const express = require("express");
const articlesRouter = express.Router();
const { getArticles } = require("../controllers/articles-controller.js");

articlesRouter.route("/").get(getArticles);
articlesRouter.route("/:article_id").get(getArticles);

module.exports = { articlesRouter };
