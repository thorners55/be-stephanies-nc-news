const express = require("express");
const articlesRouter = express.Router();
const {
  getArticle,
  patchArticleById,
} = require("../controllers/articles-controller.js");
const { handler405 } = require("../controllers/errors-controller.js");

articlesRouter.route("/").get(getArticle);
articlesRouter.route("/:article_id").get(getArticle);
articlesRouter.route("/:article_id").patch(patchArticleById);

module.exports = { articlesRouter };
