// models/ChatMessage.js
import mongoose from 'mongoose';  // ES module import
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  message: String,
  user: String,
  timestamp: Date
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;