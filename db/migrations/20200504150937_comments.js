exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("comment_id").primary();
    table.string("author").unsigned();
    table.foreign("author").references("username").inTable("users");
    table.integer("article_id");
    table.foreign("article_id").references("article_id").inTable("articles");
    table.integer("votes").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("body", [10000]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
