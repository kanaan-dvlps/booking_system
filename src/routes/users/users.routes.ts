import { Router, Response } from "express";
import { authenticateJWT } from "../../middleware/auth";
import { createUserController, getUserByIdController, getUserByPhoneNumberController, getUsersController, updateUserController, deleteUserController } from "../../controllers/users/users.controller";
import { User, IReturnUser, IReturnUsers } from "../../interfaces/users.interface";
import Joi from "joi";
import { ApiMessages } from "../../constants/api.messages";
import { IExtendedRequest } from "../../interfaces/extendedRequest.interface";

const router = Router();

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const users = await getUsersController();
    res.status(200).json({
      type: ApiMessages.SUCCESS,
      response: users
    });
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Id is required"
      });
    } else {
      const user = await getUserByIdController(id);
      if (!user) {
        res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "User not found"
        });
      } else {
        res.status(200).json({
          type: ApiMessages.SUCCESS,
          response: user
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.get("/phone/:phoneNumber", authenticateJWT, async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    if(!phoneNumber) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Phone number is required"
      });
    } else {
      const user = await getUserByPhoneNumberController(phoneNumber);
      if (!user) {
        res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "User not found"
        });
      } else {
        res.status(200).json({
          type: ApiMessages.SUCCESS,
          response: user
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, phone_number, role } = req.body as User;
    const schema = Joi.object({
      name: Joi.string().required(),
      phone_number: Joi.string().required(),
      role: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: error.message
      });
    } else {
      const user = await createUserController({ name, phone_number, role });
      if (user === null) {
        res.status(400).json({
          type: ApiMessages.FORBIDDEN,
          response: ApiMessages.ENTITY_ALREADY_EXISTS
        });
      } else {
        res.status(201).json({
          type: ApiMessages.CREATED,
          response: user
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone_number, role } = req.body as User;
    const schema = Joi.object({
      name: Joi.string().required(),
      phone_number: Joi.string().required(),
      role: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (!id) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Id is required"
      });
    } else if (error) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: error.message
      });
    } else {
      const user = await updateUserController(id, { name, phone_number, role });
      if (!user) {
        res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "User not found"
        });
      } else {
        res.status(200).json({
          type: ApiMessages.UPDATED,
          response: user
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message
    });
  }
});

router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Id is required"
      });
    } else {
      const user = await deleteUserController(id);
      if (!user) {
        res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "User not found"
        });
      } else {
        res.status(200).json(user);
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
