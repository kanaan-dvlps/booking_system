import { Request } from "express";
import { IReturnUser } from "./users.interface";

export interface IExtendedRequest extends Request {
  user?: Partial<IReturnUser>;
}
