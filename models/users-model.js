const knex = require("../db/connection.js");

exports.selectUser = (reqParam) => {
  console.log("inside selectUser in users model");
  return knex.select("*").from("users").where("username", reqParam);
};
