const express = require("express");
const articlesRouter = express.Router();
const {
  getArticle,
  patchArticleById,
  getComments,
  postComment,
} = require("../controllers/articles-controller.js");
const { handler405 } = require("../controllers/errors-controller.js");

articlesRouter.route("/").get(getArticle);
articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticleById)
  .all(handler405);

articlesRouter
  .route("/:article_id/comments")
  .get(getComments)
  .post(postComment);

module.exports = { articlesRouter };
