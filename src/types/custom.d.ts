import { IReturnUser } from "../interfaces/users.interface"

// declare namespace Express {
//   export interface Request {
//     user?: Partial<IReturnUser>
//   }
// }

declare module 'express-serve-static-core' {
  interface Request {
    user?: Partial<IReturnUser>
  }
}