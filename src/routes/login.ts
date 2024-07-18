import { Router } from "express";
import {generateToken} from "../configs/jwtToken.helper";
import Joi from "joi";
import { getUserByPhoneNumberController } from "../controllers/users/users.controller";
import { ApiMessages } from "../constants/api.messages";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { phone_number } = req.body;
    const schema = Joi.object({
      phone_number: Joi.string().required(),
    });
    const { error } = schema.validate({ phone_number });
    if (error) {
      res.status(400).json({ 
        type: ApiMessages.INVALID_REQUEST, 
        response: error.message 
      });
    } else {
      const user = await getUserByPhoneNumberController(phone_number);
      if (!user) {
        res.status(400).json({ 
          type: ApiMessages.NOT_FOUND, 
          response: "User not found"
        });
      } else {
        const {id, role} = user;
        const token = generateToken({ id, role });
        if (token === "forbidden") {
          res.status(403).json({ 
            type: ApiMessages.FORBIDDEN, 
            response: "Forbidden"
          });
        } else {
          res.status(200).json({ type: ApiMessages.SUCCESS, message: token });
        }
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR, 
      response: error.message
    });
  }
});

export default router;