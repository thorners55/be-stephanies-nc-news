const {
  selectArticle,
  updateArticleVotes,
  selectAllArticles,
} = require("../models/articles-model.js");

const { selectTopicByQuery } = require("../models/topics-model.js");

const { selectUser } = require("../models/users-model.js");

const {
  insertComment,
  selectAllCommentsByArticleId,
} = require("../models/comments-model.js");

exports.getAllArticles = (req, res, next) => {
  console.log("inside getAllArticles in articles controller");
  const { author, topic, order, sort_by } = req.query;
  const validOrder = ["asc", "desc", undefined];

  if (validOrder.includes(order)) {
    const queries = [selectAllArticles(sort_by, order, author, topic)];
    if (author) queries.push(selectUser(author));
    if (topic) queries.push(selectTopicByQuery(topic));

    Promise.all(queries)
      .then(([articles, userOrTopics]) => {
        res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next({ status: 400, msg: "Invalid order query" });
  }
};

exports.getArticle = (req, res, next) => {
  const reqArticleId = parseInt(req.params.article_id);
  console.log("inside getArticle controller func");
  selectArticle(reqArticleId)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  console.log("inside patchArticleById in articles controller");
  const { inc_votes } = req.body;
  const reqArticleId = req.params.article_id;
  updateArticleVotes(reqArticleId, inc_votes)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  console.log("inside getComments in articles controller");
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  selectAllCommentsByArticleId(article_id, sort_by, order)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  console.log("inside postComment in articles controller");

  const { username } = req.body;
  const { body } = req.body;

  const reqArticleId = req.params.article_id;
  insertComment(reqArticleId, username, body)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
