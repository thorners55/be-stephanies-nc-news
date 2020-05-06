const knex = require("../db/connection.js");

exports.selectArticle = (articleId) => {
  console.log("inside selectArticles in articles model");
  return knex
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .where("articles.article_id", articleId)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id");
};

// Select info from articles
// Make a new count from comments.article_id and name it comment_count on articles
// Only get the info for where articles.article_id matched the request parameter
// Join the comments.article_id from the comments table onto articles_article.id where these ids match

/*
SELECT articles.* 
COUNT comments.article_id AS comment_count
FROM articles
WHERE articles.article_id is articleId
LEFT JOIN comments ON articles.article_id=comments.article_id
GROUP BY articles.article_id*/
