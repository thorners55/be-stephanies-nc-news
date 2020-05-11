const knex = require("../db/connection.js");

exports.selectArticle = (articleId) => {
  console.log("inside selectArticle in articles model");
  return knex
    .select("*")
    .from("articles")
    .where("article_id", articleId)
    .then((article) => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "Article not found" });
    })
    .then(() => {
      return knex
        .select("articles.*")
        .count("comments.article_id as comment_count")
        .from("articles")
        .where("articles.article_id", articleId)
        .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
        .groupBy("articles.article_id");
    });
};

exports.selectAllArticles = (sort_by, order, author, topic) => {
  console.log("inside selectAllArticles in articles model");
  return knex
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify((query) => {
      if (author) query.where("articles.author", author);
    })
    .modify((query) => {
      if (topic) query.where("articles.topic", topic);
    });
  /*.then((articles) => {
      if (articles.length === 0)
        next({ status: 400, msg: "column does not exist" }); 
    }); */
};

exports.selectArticlesByAuthor = (author, sort_by, order) => {
  console.log("inside selectArticlesByAuthor in articles model");
  return knex
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .where("articles.author", author)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc");
};

exports.selectArticlesByTopic = (
  topic,
  sort_by = "created_at",
  order = "desc"
) => {
  console.log("inside selectArticlesByTopic in articles model");
  return knex
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .where({ "articles.topic": topic })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc");
};
/*.modify((query) => {
   if (author) query.where('author', author); // if author exists, will create a .where("author", author). Need author paramter at the top
 }) */

exports.updateArticleVotes = (articleId, votes = 0) => {
  console.log("inside updateArticleVotes in articles model");
  console.log(votes);
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
