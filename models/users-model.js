const knex = require("../db/connection.js");

exports.selectUser = (reqParam) => {
  console.log("inside selectUser in users model");
  return knex
    .select("*")
    .from("users")
    .where("username", reqParam)
    .then((user) => {
      console.log(user);
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: "Username not found" });
    })
    .then(() => {
      return knex.select("*").from("users").where("username", reqParam);
    });
};
