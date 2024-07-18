import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IMessage } from "../../interfaces/messageModel/message.interface";

const messageSchema = new Schema<IMessage>({
  message_id: { type: String, default: uuidv4 },
  sender_id: { type: String, required: true },
  receiver_id: { type: String, required: true },
  body: { type: String, required: true },
  correlation_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Message = model<IMessage>("Message", messageSchema);
export default Message;
export { messageSchema };
