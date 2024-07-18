import { Router } from "express";
import { ApiMessages } from "../../constants/api.messages";
import Joi from "joi";
import { IExtendedRequest } from "../../interfaces/extendedRequest.interface";
import {
  createConversationController,
  getConversationByIdController,
  getAllConversationsController,
  updateMessageController,
  deleteConversationController,
} from "../../controllers/messages/messages.controller";
import { authenticateJWT } from "../../middleware/auth";

const router = Router();

router.get("/", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const conversations = await getAllConversationsController();
    res.status(200).json({
      type: ApiMessages.SUCCESS,
      response: conversations,
    });
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message,
    });
  }
});

router.get("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Id is required",
      });
    }
    const conversation = await getConversationByIdController(id);
    if (!conversation) {
      return res.status(404).json({
        type: ApiMessages.NOT_FOUND,
        response: "Conversation not found",
      });
    }
    res.status(200).json({
      type: ApiMessages.SUCCESS,
      response: conversation,
    });
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message,
    });
  }
});

router.post("/", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { sender_id, receiver_id, body, correlation_id } = req.body;
    const schema = Joi.object({
      sender_id: Joi.string().required(),
      receiver_id: Joi.string().required(),
      body: Joi.string().required(),
      correlation_id: Joi.string().optional(),
    });
    const { error } = schema.validate({ sender_id, receiver_id, body, correlation_id });
    if (error) {
      return res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: error.message,
      });
    } else if (sender_id === receiver_id) {
      return res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: "Sender and receiver cannot be the same",
      });
    } else {
      const messageData = { sender_id, receiver_id, body, correlation_id };
      const conversation = await createConversationController(messageData);
      res.status(201).json({
        type: ApiMessages.SUCCESS,
        response: conversation,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message,
    });
  }
});

router.put("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const schema = Joi.object({
      body: Joi.string().required(),
    });
    const { error } = schema.validate({ body });
    if (error) {
      return res.status(400).json({
        type: ApiMessages.INVALID_REQUEST,
        response: error.message,
      });
    } else {
      const messageData = { message_id: id, body };
      const updatedMessage = await updateMessageController(messageData);
      if (!updatedMessage) {
        return res.status(404).json({
          type: ApiMessages.NOT_FOUND,
          response: "Message not found",
        });
      }
      res.status(200).json({
        type: ApiMessages.SUCCESS,
        response: updatedMessage,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message,
    });
  }
});

router.delete("/:id", authenticateJWT, async (req: IExtendedRequest, res) => {
  try {
    const { id } = req.params;
    const deletedConversationId = await deleteConversationController(id);
    if (!deletedConversationId) {
      return res.status(404).json({
        type: ApiMessages.NOT_FOUND,
        response: "Conversation not found",
      });
    }
    res.status(200).json({
      type: ApiMessages.SUCCESS,
      response: deletedConversationId,
    });
  } catch (error: any) {
    res.status(500).json({
      type: ApiMessages.SERVER_ERROR,
      response: error.message,
    });
  }
});

export default router;
