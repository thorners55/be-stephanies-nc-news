const knex = require("../db/connection.js");

exports.selectArticles = () => {
  console.log("inside selectArticles in articles model");
  return knex.select("*").from("articles");
};
