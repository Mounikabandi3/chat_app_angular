import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { User } from './models'; // Import the User model

@Controller('api/users')
export class UserController {
    @Post()
    public async addUser(req: Request, res: Response): Promise<void> {
        const { name } = req.body;
        try {
            if (!name) {
                res.status(400).json({ error: 'Name is required' });
                return;
            }

            const user = new User({ name });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            console.error('Error storing user:', error);
            res.status(500).json({ error: 'Failed to store user name' });
        }
    }

    @Get()
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find(); // Fetch all users from the database
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }
}
