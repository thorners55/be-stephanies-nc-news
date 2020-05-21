// const customConfig = require("../knexfile.js");
// const knexMaker = require("knex");
// const knex = knexMaker(customConfig);

// module.exports = knex;

const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");

module.exports = knex(dbConfig);
