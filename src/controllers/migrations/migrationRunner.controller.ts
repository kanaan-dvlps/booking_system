import type { Knex } from "knex";
import { getDatabaseConnection } from "../../configs/databaseInitializer";
import path from "path";

type Migration = {
  file: string;
  directory: string;
};

type MigrationResult = [number, string[]];

const migrationFiles = [path.join(__dirname, `../../database/migrations`)];

const migrationConfig: Knex.MigratorConfig = {
  directory: migrationFiles,
};

export async function listMigrationFiles(): Promise<Migration[]> {
  const knex = getDatabaseConnection();
  return (await knex.migrate.list(migrationConfig)) as Migration[];
}

export async function migrateToLatest(): Promise<MigrationResult> {
  const knex = getDatabaseConnection();
  return (await knex.migrate.latest(migrationConfig)) as MigrationResult;
}

export async function migrateUp(): Promise<MigrationResult> {
  const knex = getDatabaseConnection();
  return (await knex.migrate.up(migrationConfig)) as MigrationResult;
}

export async function rollbackMigration(): Promise<MigrationResult> {
  const knex = getDatabaseConnection();
  return (await knex.migrate.rollback(migrationConfig)) as MigrationResult;
}
