const { devConnection, testConnection } = require("./config.js");

// process.env.NODE_ENV = 'test'
// NODE_ENV=test npm run seed   // seed-test
// npm run seed   // seed-dev

const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: devConnection,
  },
  test: {
    connection: testConnection,
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
