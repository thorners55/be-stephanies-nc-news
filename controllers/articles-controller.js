const { selectArticles } = require("../models/articles-model.js");
const { selectCommentByArticleId } = require("../models/comments-model.js");

exports.getArticles = (req, res, next) => {
  const reqArticleId = parseInt(req.params.article_id);
  console.log("inside getArticles controller func");
  selectArticles()
    .then((articles) => {
      const articleObject = articles.find((object) => {
        return object.article_id === reqArticleId;
      });
      console.log(articles);
      return articleObject;
    })
    .then((article) => {
      selectCommentByArticleId(article.article_id).then((comments) => {
        console.log(comments);
        article.comment_count = comments.length;
        res.status(200).send(article);
      });
    });
};
