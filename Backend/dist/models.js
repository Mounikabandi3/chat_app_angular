"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRequest = exports.Message = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// User schema
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
});
exports.User = mongoose_1.default.model('User', userSchema);
// Message schema
const messageSchema = new mongoose_1.default.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
exports.Message = mongoose_1.default.model('Message', messageSchema);
// Conversation Request schema
const conversationRequestSchema = new mongoose_1.default.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    timestamp: { type: Date, default: Date.now },
});
exports.ConversationRequest = mongoose_1.default.model('ConversationRequest', conversationRequestSchema);
