const knex = require("../db/connection.js");

exports.selectUser = () => {
  console.log("inside selectUser in users model");
  return knex.select("*").from("users");
};
