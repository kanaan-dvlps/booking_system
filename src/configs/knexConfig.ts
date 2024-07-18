import { Knex } from "knex";

export const knexConfig: Knex.Config = {
  client: "pg",
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations",
    disableMigrationsListValidation: true,
  },
  connection: {
    connectionString: process.env["POSTGRES_CONNECTION_URL"],
  },
  pool: {
    min: 2,
    max: 4,
  },
  debug: true,
};
