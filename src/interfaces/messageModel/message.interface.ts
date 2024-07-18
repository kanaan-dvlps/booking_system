import { Document } from "mongoose";

export interface IMessage extends Document {
  message_id: string;
  sender_id: string;
  receiver_id: string;
  body: string;
  correlation_id: string;
  created_at: Date;
}
