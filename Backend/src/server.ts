import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { UserController } from './UserController'; // Import your controller
import { Router } from 'express';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize controllers and routes
const userController = new UserController();
const router = Router();

router.post('/users', (req, res) => userController.addUser(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));

// Apply routes
app.use('/api', router);

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://prembandi763:IzYFZTgAZLfm37lq@cluster0.d5pti.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri)
  .then(() => console.log('Mongoose is connected'))
  .catch(err => console.error('Mongoose connection error:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
