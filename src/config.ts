import dotenv from "dotenv";

dotenv.config();

export namespace Knex {
  export const config = {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOSTNAME,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN,
      max: process.env.DATABASE_POOL_MAX,
      idleTimeoutMillis: process.env.DATABASE_POOL_IDLE_TIMEOUT_MILLIS,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  };
}
