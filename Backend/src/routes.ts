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
messageRouter.post('/send', async (req, res) => {
  try {
    const { from, to, content } = req.body;
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
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

messageRouter.post('/request', async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const requestMessage = new Message({
      from: sender,
      to: receiver,
      content: 'Conversation request',
      timestamp: new Date(),
    });
    await requestMessage.save();
    res.status(201).send(requestMessage);
  } catch (error) {
    res.status(400).send(error);
  }
});

messageRouter.post('/respond', async (req, res) => {
  try {
    const { requestId, response } = req.body; // response can be 'accepted' or 'rejected'
    const message = await Message.findById(requestId);
    if (message) {
      // Handle response here
      if (response === 'accepted') {
        // Add additional logic if needed
      }
      res.status(200).send({ message: 'Response received' });
    } else {
      res.status(404).send({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

messageRouter.get('/requests/:user', async (req, res) => {
  try {
    const { user } = req.params;
    const requests = await Message.find({ to: user, content: 'Conversation request' });
    res.send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { userRouter, messageRouter };
