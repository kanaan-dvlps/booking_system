import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IConversation } from "../../interfaces/conversationModel/conversation.interface";
import { messageSchema } from "./message.model";

const conversationSchema = new Schema<IConversation>({
  conversation_id: { type: String, default: uuidv4 },
  messages: [{ type: messageSchema, required: true }],
  updated_at: { type: Date, default: Date.now },
});

const Conversation = model<IConversation>("Conversation", conversationSchema);

export default Conversation;
