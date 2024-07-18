import { IMessage } from "../../interfaces/messageModel/message.interface";
import { IConversation } from "../../interfaces/conversationModel/conversation.interface";
import {
  createConversation,
  getAllConversations,
  getConversationById,
  updateMessage,
  deleteConversation
} from "../../repository/messages.repository";

export const createConversationController = async (messageData: {
  sender_id: string;
  receiver_id: string;
  body: string;
  correlation_id?: string; // Optional correlation_id for threading
}): Promise<IConversation | null> => {
  return createConversation(messageData);
};

export const getConversationByIdController = async (conversationId: string): Promise<IConversation | null> => {
  return getConversationById(conversationId);
};

export const getAllConversationsController = async (): Promise<IConversation[]> => {
  return getAllConversations();
};

export const updateMessageController = async (messageData: {
  message_id: string;
  body: string;
}): Promise<IMessage | null> => {
  const { message_id, body } = messageData;
  return updateMessage(message_id, body);
};

export const deleteConversationController = async (conversationId: string): Promise<string | null> => {
  return deleteConversation(conversationId);
};
