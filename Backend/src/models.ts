import mongoose from 'mongoose';

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const User = mongoose.model('User', userSchema);

// Message schema
const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);

// Conversation Request schema
const conversationRequestSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  timestamp: { type: Date, default: Date.now },
});

export const ConversationRequest = mongoose.model('ConversationRequest', conversationRequestSchema);
