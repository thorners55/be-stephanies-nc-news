exports.up = function (knex) {
  return knex.schema.createTable("articles", (table) => {
    table.increments("article_id").primary();
    table.string("title");
    table.string("body", [10000]);
    table.integer("votes").defaultTo(0);
    table.string("topic").unsigned();
    table.foreign("topic").references("slug").inTable("topics");
    table.string("author").unsigned();
    table.foreign("author").references("username").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
