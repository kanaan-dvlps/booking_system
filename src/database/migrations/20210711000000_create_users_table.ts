import { Knex } from "knex";
import { Tables, Fields } from "../constants/table.constant";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable(Tables.USERS, (table) => {
    table.uuid(Fields.ID).primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string(Fields.NAME).notNullable();
    table.string(Fields.PHONE_NUMBER).notNullable();
    table.string(Fields.ROLE).notNullable();
    table.timestamp(Fields.CREATED_AT).defaultTo(knex.fn.now()).notNullable();
    table.timestamp(Fields.UPDATED_AT).defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Tables.USERS);
}
