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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Import cors package
const models_1 = require("./models"); // Import your User model
const routes_1 = require("./routes"); // Import the routers from routes.ts
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON bodies
app.use((0, cors_1.default)()); // Enable CORS
app.use('/api/users', routes_1.userRouter);
app.use('/api/messages', routes_1.messageRouter);
// MongoDB connection using environment variable
const mongoUri = 'mongodb+srv://prembandi763:IzYFZTgAZLfm37lq@cluster0.d5pti.mongodb.net/chat_db?retryWrites=true&w=majority';
mongoose_1.default.connect(mongoUri)
    .then(() => {
    console.log('Mongoose is connected');
})
    .catch(err => {
    console.error('Mongoose connection error:', err);
});
// Endpoint to store a user's name
app.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// Endpoint to get a list of all users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.find(); // Fetch all users from the database
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}));
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
