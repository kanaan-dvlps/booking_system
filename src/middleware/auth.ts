import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IReturnUser } from '../interfaces/users.interface';
import { ApiMessages } from '../constants/api.messages';
import { ROLES } from '../database/constants/table.constant';

interface CustomRequest extends Request {
  user?: Partial<IReturnUser>;
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(403).json({
      type: ApiMessages.FORBIDDEN,
      response: ApiMessages.UNAUTHORIZED
      });
  }

  jwt.verify(token, process.env["JTW_SECRET_KEY"] as string, (err, decoded) => {
    if (err) {
      return res.sendStatus(403).json({
        type: ApiMessages.FORBIDDEN,
        response: err.message
        });
    }

    req.user = decoded as Partial<IReturnUser>;
    next();
  });
};
