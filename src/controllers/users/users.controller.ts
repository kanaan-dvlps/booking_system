import { getUserById, getUserByPhoneNumber, getUsers, getUserRole, updateUserById, createUser, deleteUserById } from "../../repository/users.repository";
import { IReturnUser, IReturnUsers, User } from "../../interfaces/users.interface";

export async function getUsersController(): Promise<IReturnUsers> {
  return await getUsers();
}

export async function getUserByIdController(id: string): Promise<IReturnUser> {
  return await getUserById(id);
}

export async function getUserByPhoneNumberController(phoneNumber: string): Promise<IReturnUser> {
  return await getUserByPhoneNumber(phoneNumber);
}

export async function getUserRoleController(id: string): Promise<Partial<IReturnUser> | null> {
  return await getUserRole(id);
}

export async function createUserController(user: User): Promise<IReturnUser | null> {
  return await createUser(user);
}

export async function updateUserController(id: string, user: Partial<User>): Promise<IReturnUser> {
  return await updateUserById(id, user);
}

export async function deleteUserController(id: string): Promise<IReturnUser> {
  return await deleteUserById(id);
}
