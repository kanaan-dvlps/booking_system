import { IMessage } from "../messageModel/message.interface";
import { Document } from "mongoose";

export interface IConversation extends Document {
  conversation_id: string;
  messages: IMessage[];
  created_at: Date;
  updated_at: Date;
}