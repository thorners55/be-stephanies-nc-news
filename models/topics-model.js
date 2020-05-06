const knex = require("../db/connection.js");

exports.selectTopics = () => {
  console.log("inside selectTopics in topics model");
  return knex.select("*").from("topics");
};
