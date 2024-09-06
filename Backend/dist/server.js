"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models"); // Import your User model
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON bodies
// MongoDB connection
mongoose_1.default.connect('mongodb://localhost:27017/chat-app')
    .then(() => {
    console.log('Mongoose is connected');
})
    .catch(err => {
    console.error('Mongoose connection error:', err);
});
// Endpoint to store a user's name
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const user = new models_1.User({ name });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to store user name' });
    }
}));
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
