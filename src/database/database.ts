import { type Knex, knex } from "knex";
import { env } from "../shared/schema/env.shema";

const connectionConfig =
  env.DATABASE_CLIENT === "sqlite"
    ? { filename: "./src/database/db.sqlite" }
    : env.DATABASE_URL;
// ssl: env.DB_SSL ? { rejectUnauthorized: false } : false,
export const dbConfig: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: connectionConfig,
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

export const db = knex(dbConfig);
