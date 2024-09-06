import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors package
import { User } from './models'; // Import your User model

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS

// MongoDB connection using environment variable
const mongoUri = 'mongodb://localhost:27017/chat_db'; 
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Mongoose is connected');
  })
  .catch(err => {
    console.error('Mongoose connection error:', err);
  });

// Endpoint to store a user's name
app.post('/api/users', async (req, res) => {
  const { name } = req.body;

  try {
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to store user name' });
  }
});

// Endpoint to get a list of all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
