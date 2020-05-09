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

exports.selectAllArticles = (
  { author, topic } = {},
  sort_by = "created_at",
  order = "desc"
) => {
  console.log("inside selectAllArticles");
  console.log(author, topic, order);
  return knex
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify((query) => {
      if (author) query.where({ "articles.author": author });
    })
    .modify((query) => {
      if (topic) query.where({ "articles.topic": topic });
    });
};
/*.modify((query) => {
   if (author) query.where('author', author); // if author exists, will create a .where("author", author). Need author paramter at the top
 }) */

exports.updateArticleVotes = (articleId, votes) => {
  console.log("inside updateArticleVotes in articles model");
  return knex("articles")
    .increment("votes", votes)
    .where("article_id", articleId)
    .returning("*");
};
/*
    .then((article) => {
      console.log(article, "<---------------------_");
      res.status(200).send({ article });
    }); */
//.catch(next);

// Select all from articles where article_id is articleId

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

/* .where(function () {
        this.where("articles.author", user).andWhere("articles.topic", top);
      }) */
