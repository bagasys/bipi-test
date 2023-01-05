require("ts-node").register();

const dotenv = require("dotenv");

dotenv.config();

console.log(process.env);

module.exports = {
  client: "pg",
  connection: {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOSTNAME,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
  },
  pool: {
    min: parseInt(process.env.DATABASE_POOL_MIN),
    max: parseInt(process.env.DATABASE_POOL_MAX),
    idleTimeoutMillis: parseInt(process.env.DATABASE_POOL_IDLE_TIMEOUT_MILLIS),
  },
  acquireConnectionTimeout: 2000,
};
