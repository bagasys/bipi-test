require("ts-node").register();

module.exports = {
  client: "pg",
  connection: {
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "bipi_test",
  },
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 2000,
  },
  acquireConnectionTimeout: 2000,
};
