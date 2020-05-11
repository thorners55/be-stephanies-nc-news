const knex = require("../db/connection.js");

exports.selectTopics = () => {
  console.log("inside selectTopics in topics model");
  return knex.select("*").from("topics");
};

exports.selectTopicByQuery = (topic) => {
  console.log("inside selectTopicByQuery in topics model");
  return knex
    .select("*")
    .from("topics")
    .where("slug", topic)
    .then((topics) => {
      if (topics.length === 0)
        return Promise.reject({ status: 404, msg: "Topic not found" });
    });
};
