const knex = require("../db/connection.js");

exports.selectCommentByArticleId = (articleId) => {
  console.log("inside selectCommentByArticleId function in comments model");
  return knex
    .select("articles.*")
    .count("articles.article_id as comment_count")
    .from("articles")
    .where("articles.article_id", articleId)
    .leftJoin("articles", "comments.article_id", "=", "articles.article_id")
    .groupBy("article_id");
};

exports.selectAllCommentsByArticleId = (articleId, query, ascordesc) => {
  console.log("inside selectAllCommentsByArticleId function in comments model");
  return knex
    .select("*")
    .from("articles")
    .where("article_id", articleId)
    .then((article) => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "article not found" });
    })
    .then(() => {
      return knex
        .select("*")
        .from("comments")
        .where("article_id", articleId)
        .orderBy(query || "created_at", ascordesc || "desc")
        .returning("*");
    });
};

exports.insertComment = (articleId, username, body) => {
  console.log("inside insertComment in comments model");
  if (!username || !body)
    return Promise.reject({
      status: 400,
      msg: "request must include username and body",
    });
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .then((users) => {
      if (users.length < 1)
        return Promise.reject({ status: 422, msg: "username not found" });
    })
    .then(() => {
      return knex("comments")
        .insert([{ body: body, author: username, article_id: articleId }])
        .where("comments.article_id", articleId)
        .returning("*");
    });
};

exports.updateCommentVotes = (commentId, votes = 0) => {
  console.log("inside updateCommentVotes in comments model");

  return knex
    .select("*")
    .from("comments")
    .where("comment_id", commentId)
    .then((comment) => {
      if (comment.length < 1)
        return Promise.reject({ status: 404, msg: "comment not found" });
    })
    .then(() => {
      return knex("comments")
        .increment("votes", votes)
        .where("comment_id", commentId)
        .returning("*");
    });
};

exports.removeComment = (commentId) => {
  console.log("inside removeComment in comments model");
  console.log(commentId);
  return knex("comments").where("comment_id", commentId).delete();
};

/*   return knex("comments")
    .count("article_id as comment_count")
    .where("article_id", articleId);*/

/* SELECT COUNT(column_name)
FROM table_name
WHERE condition; */

/*
SELECT articles.* FROM articles
COUNT article_id AS comment_count
WHERE article_id is articleId
LEFT JOIN articles ON comments.article_id=articles.article_id 
GROUP BY article_id*/
