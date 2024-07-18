import { getUserRoleController } from "../controllers/users/users.controller";
import { IReturnUser } from "../interfaces/users.interface";

export async function getUserRole(id: string): Promise<Partial<IReturnUser> | null> {
  return getUserRoleController(id);
}
