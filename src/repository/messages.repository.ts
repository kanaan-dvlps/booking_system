import { IMessage } from "../interfaces/messageModel/message.interface";
import Message from "../database/mongooseModels/message.model";
import { IConversation } from "../interfaces/conversationModel/conversation.interface";
import Conversation from "../database/mongooseModels/conversation.model";
import { getDatabaseConnection } from "../configs/databaseInitializer";
import { Knex } from 'knex';
import { Tables, Fields, ForeignKeys } from "../database/constants/table.constant";
import { v4 as uuid } from 'uuid';

export const createConversation = async (messageData: {
  sender_id: string;
  receiver_id: string;
  body: string;
  correlation_id?: string;
}): Promise<IConversation | null> => {
  const { sender_id, receiver_id, body, correlation_id } = messageData;

  const newCorrelationId = correlation_id || uuid();

  const message = new Message({
    sender_id,
    receiver_id,
    body,
    correlation_id: newCorrelationId,
  });

  await message.save();

  let conversation: IConversation | null;
  if (correlation_id) {
    conversation = await Conversation.findOneAndUpdate(
      { "messages.correlation_id": correlation_id },
      { $push: { messages: message }, updated_at: new Date() },
      { new: true }
    ).exec();

    if (!conversation) {
      throw new Error("Conversation not found for the provided correlation_id");
    }
  } else {
    conversation = new Conversation({
      messages: [message],
    });

    await conversation.save();

    const knex: Knex = getDatabaseConnection();
    await knex(Tables.CONVERSATIONS).insert({
      [Fields.ID]: conversation.conversation_id,
      [ForeignKeys.SENDER_ID]: sender_id,
      [ForeignKeys.RECEIVER_ID]: receiver_id,
      [Fields.CREATED_AT]: conversation.created_at,
      [Fields.UPDATED_AT]: conversation.updated_at,
    });
  }

  return conversation;
};

export const getConversationById = async (conversationId: string): Promise<IConversation | null> => {
  const knex: Knex = getDatabaseConnection();
  const conversation = await knex(Tables.CONVERSATIONS)
    .where({ [Fields.ID]: conversationId })
    .first();

  if (!conversation) {
    return null;
  } else {
    const conversationWithMessages = await Conversation.findOne({ conversation_id: conversationId }).populate('messages').exec();
    return conversationWithMessages;
  }
};

export const getAllConversations = async (): Promise<IConversation[]> => {
  const knex: Knex = getDatabaseConnection();
  const conversations = await knex(Tables.CONVERSATIONS).select();

  const conversationIds = conversations.map(convo => convo[Fields.ID]);
  const conversationsWithMessages = await Conversation.find({ conversation_id: { $in: conversationIds } }).populate('messages').exec();

  return conversationsWithMessages;
};

export const updateMessage = async (messageId: string, newBody: string): Promise<IMessage | null> => {
  const updatedMessage = await Message.findOneAndUpdate(
    { message_id: messageId },
    { body: newBody, updated_at: new Date() },
    { new: true }
  ).exec();

  return updatedMessage;
};

export const deleteConversation = async (conversationId: string): Promise<string | null> => {
  // First, delete the conversation from MongoDB
  const deletedConversation = await Conversation.findOneAndDelete({ conversation_id: conversationId }).exec();

  if (!deletedConversation) {
    return null; // Conversation not found in MongoDB
  }

  // Then, delete the conversation reference from PostgreSQL
  const knex: Knex = getDatabaseConnection();
  await knex(Tables.CONVERSATIONS).where(Fields.ID, conversationId).delete();

  // Return the deleted conversation ID
  return conversationId;
};
