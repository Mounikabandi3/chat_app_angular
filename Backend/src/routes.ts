import { Router } from 'express';
import { User, Message } from './models';
import crypto from 'crypto';

const userRouter = Router();
const messageRouter = Router();

// User routes
userRouter.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Message routes
messageRouter.post('/', async (req, res) => {
  try {
    const { from, to, content } = req.body;
    const key = crypto.randomBytes(32); // Generate a random key for AES encryption
    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(content, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const message = new Message({
      from,
      to,
      content: `${key.toString('hex')}:${iv.toString('hex')}:${encrypted}`,
    });
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

messageRouter.get('/:user', async (req, res) => {
  try {
    const { user } = req.params;
    const messages = await Message.find({ $or: [{ from: user }, { to: user }] });
    res.send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { userRouter, messageRouter };
