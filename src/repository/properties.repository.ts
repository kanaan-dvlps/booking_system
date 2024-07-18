import { getDatabaseConnection } from "../configs/databaseInitializer";
import { Tables } from "../database/constants/table.constant";
import { IReturnProperty, IReturnProperties, IProperty, IPropertyUpdate } from "../interfaces/property.interface";

export async function createProperty(property: IProperty): Promise<IReturnProperty> {
  const knex = getDatabaseConnection();
  const { name, user_id } = property;
  const [createdProperty] = await knex(Tables.PROPERTIES).insert({
    name, 
    user_id
  }).returning("*");
  return createdProperty;
}

export async function getProperties(): Promise<IReturnProperties> {
  const knex = getDatabaseConnection();
  const properties = await knex(Tables.PROPERTIES).select("*").returning("*");
  return { properties };
}

export async function getPropertyById(id: string): Promise<IReturnProperty> {
  const knex = getDatabaseConnection();
  const [property] = await knex(Tables.PROPERTIES).select("*").where({ id });
  return property;
}

export async function getPropertyByOwnerId(user_id: string): Promise<IReturnProperties> {
  const knex = getDatabaseConnection();
  const properties = await knex(Tables.PROPERTIES).select("*").where({ user_id });
  return { properties };
}

export async function updatePropertyById(id: string, property: IPropertyUpdate): Promise<IReturnProperty> {
  const knex = getDatabaseConnection();
  const { name } = property;
  const [updatedProperty] = await knex(Tables.PROPERTIES)
    .where({ id })
    .update({ name, updated_at: new Date().toISOString() })
    .returning("*");
  return updatedProperty;
}

export async function deletePropertyById(id: string): Promise<IReturnProperty> {
  const knex = getDatabaseConnection();
  const [deletedProperty] = await knex(Tables.PROPERTIES).where({ id }).delete().returning("*");
  return deletedProperty;
}
