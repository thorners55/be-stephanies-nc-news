const knex = require("../db/connection.js");

exports.selectCommentByArticleId = (articleId) => {
  console.log("inside selectCommentByArticleId function in comments model");
  return knex
    .select("articles.*")
    .count("articles.article_id as comment_count")
    .from("articles")
    .where("article_id", articleId)
    .leftJoin("articles", "comments.article_id", "=", "articles.article_id")
    .groupBy("article_id");
};

exports.insertComment = (articleId, username, body) => {
  console.log("inside insertComment in comments-model");
  return knex("comments")
    .insert([{ body: body, author: username, article_id: articleId }])
    .where("comments.article_id", articleId)
    .returning("*");
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
