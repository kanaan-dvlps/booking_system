import { knex, type Knex } from "knex";
import { knexConfig } from "./knexConfig";
import {
  logSuccess,
  logError,
  logInfo,
  logWarning,
} from "../helpers/consoleLogs.helper";

let knexConnectionPool: Knex | undefined;
export function createDatabaseConnectionPool() {
  if (!knexConnectionPool) {
    logInfo("PG Database", "Creating a connection pool for PG database" + "\n");
    knexConnectionPool = knex(knexConfig);

    logSuccess("PG_HOST", process.env["POSTGRES_HOST"] as string);
    logSuccess("PG_Port", process.env["POSTGRES_PORT"] as string);
    logSuccess("PG_DB", process.env["POSTGRES_DB"] as string);

    logSuccess(
      "PG Database",
      "Successfully created a connection pool for PG database" + "\n"
    );

    logInfo(
      "PG Database",
      "Connection pool creation time: " + new Date().toISOString() + "\n"
    );
  } else {
    logInfo("PG Database", "Reusing existing connection pool for PG database");
  }
}

export function getDatabaseConnection() {
  if (!knexConnectionPool) {
    logError("PG Database", "Connection pool not created yet");
    throw new Error("Connection pool not created yet");
  }
  return knexConnectionPool;
}

export async function closeDatabaseConnectionPool() {
  if (knexConnectionPool) {
    await knexConnectionPool?.destroy();
    knexConnectionPool = undefined;
    logWarning("PG Database", "Connection pool closed gracefully");
  }
}
