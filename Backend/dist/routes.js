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
exports.messageRouter = exports.userRouter = void 0;
const express_1 = require("express");
const models_1 = require("./models");
const crypto_1 = __importDefault(require("crypto"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const messageRouter = (0, express_1.Router)();
exports.messageRouter = messageRouter;
// User routes
userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new models_1.User(req.body);
        yield user.save();
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Message routes
messageRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, content } = req.body;
        const key = crypto_1.default.randomBytes(32); // Generate a random key for AES encryption
        const iv = crypto_1.default.randomBytes(16); // Generate a random IV
        const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(content, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const message = new models_1.Message({
            from,
            to,
            content: `${key.toString('hex')}:${iv.toString('hex')}:${encrypted}`,
        });
        yield message.save();
        res.status(201).send(message);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
messageRouter.get('/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.params;
        const messages = yield models_1.Message.find({ $or: [{ from: user }, { to: user }] });
        res.send(messages);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
