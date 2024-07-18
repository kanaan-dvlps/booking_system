import jwt from "jsonwebtoken";
import { IReturnUser } from "../interfaces/users.interface";

export const generateToken = (user: Partial<IReturnUser>): string => {
  const {id, role} = user;

  const token = jwt.sign(
    {
      id,
      role,
    },
    process.env["JTW_SECRET_KEY"] as string,
    { expiresIn: process.env["JTW_EXPIRES_IN"] }
  );

  return token;
};
