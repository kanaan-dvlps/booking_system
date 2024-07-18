import { Knex } from "knex";
import { Tables, Fields, ForeignKeys } from "../constants/table.constant";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Tables.CONVERSATIONS, (table) => {
    table.uuid(Fields.ID).primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid(ForeignKeys.SENDER_ID)
      .references(Fields.ID)
      .inTable(Tables.USERS)
      .onDelete("CASCADE")
      .notNullable();
    table
      .uuid(ForeignKeys.RECEIVER_ID)
      .references(Fields.ID)
      .inTable(Tables.USERS)
      .onDelete("CASCADE")
      .notNullable();
    table.timestamp(Fields.CREATED_AT).defaultTo(knex.fn.now()).notNullable();
    table.timestamp(Fields.UPDATED_AT).defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Tables.CONVERSATIONS);
}
