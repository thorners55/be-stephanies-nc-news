const {
  selectArticle,
  updateArticleVotes,
  selectArticlesByAuthor,
  selectArticlesByTopic,
  selectAllArticles,
} = require("../models/articles-model.js");

const { selectTopicByQuery } = require("../models/topics-model.js");

const { selectUser } = require("../models/users-model.js");
const { handler400, handler422 } = require("./errors-controller.js");

const {
  insertComment,
  selectAllCommentsByArticleId,
} = require("../models/comments-model.js");

exports.getAllArticles = (req, res, next) => {
  console.log("inside getAllArticles in articles controller");
  const { author, topic, order, sort_by } = req.query;
  const validOrder = ["asc", "desc", undefined];
  if (validOrder.includes(order)) {
    // selectArticles(sortby order author) --> [{},{}], []
    // if author check for that author
    const queries = [selectAllArticles(sort_by, order, author, topic)];
    if (author) queries.push(selectUser(author));
    if (topic) queries.push(selectTopicByQuery(topic));
    // if (topic) queries.push(selectArticlesByTopic(topic, sort_by, order));

    Promise.all(queries)
      .then(([articles, userOrTopics]) => {
        // articles: [{}, {}]
        // articles: [], user: [] 404
        // articles: [], user: [{}] 200
        console.log(articles);
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
      console.log(article);
      return res.status(200).send({ article });
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
      console.log(article);
      return res.status(200).send({ article });
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
      console.log("back inside getComments in articles controller");
      console.log(comments);

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

  const reqArticleId = req.params.article_id;
  insertComment(reqArticleId, username, body)
    .then(([comment]) => {
      console.log("back inside postComment in articles controller");

      return res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

/* selectAllArticles({ author, topic }, sort_by, order)
      .then((articles) => {
        console.log("back inside getAllArticles in articles controller");
        console.log(articles);
        //if (articles.length === 0) handler422(req, res);
        return res.status(200).send({ articles });
      }) */
