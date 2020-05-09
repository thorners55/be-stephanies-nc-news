const {
  selectArticle,
  updateArticleVotes,
  selectAllArticles,
  selectArticlesByQuery,
} = require("../models/articles-model.js");
const { handler400, handler422 } = require("./errors-controller.js");

const {
  insertComment,
  selectAllCommentsByArticleId,
} = require("../models/comments-model.js");

exports.getAllArticles = (req, res, next) => {
  console.log("inside getAllArticles in articles controller");
  const { author, topic, order, sort_by } = req.query;
  console.log(order, { order }, sort_by, { sort_by });
  console.log(order !== undefined);
  const validOrder = ["asc", "desc", undefined];
  if (validOrder.includes(order)) {
    selectAllArticles({ author, topic }, sort_by, order)
      .then((articles) => {
        console.log("back inside getAllArticles in articles controller");
        console.log(articles);
        if (articles.length === 0) handler422(req, res);
        else return res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
  } else handler422(req, res);
};

exports.getArticle = (req, res, next) => {
  const reqArticleId = parseInt(req.params.article_id);
  console.log("inside getArticle controller func");
  selectArticle(reqArticleId)
    .then((array) => {
      console.log(array);
      if (array.length === 0) {
        return res
          .status(400)
          .send({ msg: "400 Bad Request: article does not exist" });
      } else return res.status(200).send(array[0]);
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
  const { sort_by } = req.query;
  const { order } = req.query;
  const reqArticleId = parseInt(article_id);
  selectAllCommentsByArticleId(reqArticleId, sort_by, order)
    .then((comments) => {
      console.log("back inside getComments in articles controller");
      console.log(comments);
      if (comments.length === 0)
        return res.status(404).send({ status: 404, msg: "No comments found" });
      else return res.status(200).send({ comments });
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
