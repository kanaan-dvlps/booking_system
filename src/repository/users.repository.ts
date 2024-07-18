import { getDatabaseConnection } from "../configs/databaseInitializer";
import { IReturnUser, IReturnUsers, User } from "../interfaces/users.interface";
import {ROLES, Tables} from "../database/constants/table.constant";

export async function getUsers(): Promise<IReturnUsers> {
  const knex = getDatabaseConnection();
  const users = await knex(Tables.USERS).select("*").returning("*");
  return { users };
}

export async function getUserById(id: string): Promise<IReturnUser> {
  const knex = getDatabaseConnection();
  const [user] = await knex(Tables.USERS).select("*").where({ id }).returning("*");
  return user;
}

export async function getUserByPhoneNumber(phoneNumber: string): Promise<IReturnUser> {
  const knex = getDatabaseConnection();
  const [user] = await knex(Tables.USERS).select("*").where({ phone_number: phoneNumber }).returning("*");
  return user;
}

export async function getUserRole(id: string): Promise<Partial<IReturnUser> | null> {
  const knex = getDatabaseConnection();
  const userExists = await knex(Tables.USERS).select("*").where({ id });
  if (userExists.length === 0) {
    return null;
  } else {
    const [user] = await knex(Tables.USERS).select("role").where({ id }).returning("role");
    return user;
  }
}

export async function createUser(user: User): Promise<IReturnUser | null> {
  const knex = getDatabaseConnection();

  const userExists = await knex(Tables.USERS).select("*").where({ phone_number: user.phone_number });

  if (userExists.length > 0) {
    return null;
  } else {
    const [createdUser] = await knex(Tables.USERS).insert({
      name: user.name,
      phone_number: user.phone_number,
      role: user.role === "guest" ? ROLES.GUEST : ROLES.PROPERTY_OWNER,
    }).returning("*");
    return createdUser;
  }
}

export async function updateUserById(id: string, user: Partial<User>): Promise<IReturnUser> {
  const knex = getDatabaseConnection();
  const [updatedUser] = await knex(Tables.USERS)
    .where({ id })
    .update({ ...user, updated_at: new Date().toISOString() })
    .returning("*");
  return updatedUser;
}

export async function deleteUserById(id: string): Promise<IReturnUser> {
  const knex = getDatabaseConnection();
  const [deletedUser] = await knex(Tables.USERS).where({ id }).delete().returning("*");
  return deletedUser;
}
