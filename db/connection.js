const customConfig = require("../knexfile.js");
const knexMaker = require("knex");
const knex = knexMaker(customConfig);

module.exports = knex;
