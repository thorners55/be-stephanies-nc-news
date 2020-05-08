const {
  selectArticle,
  updateArticleVotes,
} = require("../models/articles-model.js");
const { handler400 } = require("./errors-controller.js");

const {
  insertComment,
  selectAllCommentsByArticleId,
} = require("../models/comments-model.js");

exports.getArticle = (req, res, next) => {
  const reqArticleId = parseInt(req.params.article_id);
  console.log("inside getArticles controller func");
  selectArticle(reqArticleId)
    .then((array) => {
      console.log(array);
      if (array.length === 0)
        res
          .status(400)
          .send({ msg: "400 Bad Request: article does not exist" });
      return res.status(200).send(array[0]);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  console.log("inside patchArticleById in articles controller");
  console.log(req.body, "<---- HERE");
  const reqProperties = Object.values(req.body);
  if (!req.body.inc_votes) handler400(req, res);
  else if (reqProperties.length > 1) handler400(req, res);
  else {
    const { inc_votes } = req.body;
    const reqArticleId = parseInt(req.params.article_id);
    updateArticleVotes(reqArticleId, inc_votes)
      .then((article) => {
        console.log(article);
        return res.status(200).send({ article });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getComments = (req, res, next) => {
  console.log("inside getComments in articles controller");
  const { article_id } = req.params;
  console.log(article_id);
  selectAllCommentsByArticleId(article_id)
    .then((comments) => {
      console.log("back inside getComments in articles controller");
      return res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  console.log("inside postComment in articles controller");

  const { username } = req.body;
  const { body } = req.body;
  console.log(username);
  console.log(body);
  const reqArticleId = parseInt(req.params.article_id);
  insertComment(reqArticleId, username, body)
    .then((responseComment) => {
      console.log("back inside postComment in articles controller");
      const comment = responseComment[0];
      return res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

/* selectArticles()
    .then((articles) => {
      const articleObject = articles.find((object) => {
        return object.article_id === reqArticleId;
      });
      console.log(articles);
      return articleObject;
    })
    .then((article) => {
      selectCommentByArticleId(article.article_id).then((comments) => {
        console.log(comments, "<----");
        article.comment_count = comments.length;
        res.status(200).send(article);
      });
    }); */
