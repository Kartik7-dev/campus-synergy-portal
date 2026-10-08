import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  messages: {
    senderId: mongoose.Types.ObjectId;
    text: string;
    timestamp: Date;
    isRead: boolean;
  }[];
}

const ConversationSchema: Schema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [{
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
  }],
}, { timestamps: true });

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
