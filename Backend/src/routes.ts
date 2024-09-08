import { Router } from 'express';
import { UserController } from './UserController';

const router = Router();
const userController = new UserController();

router.post('/api/users', (req, res) => userController.addUser(req, res));
router.get('/api/users', (req, res) => userController.getAllUsers(req, res));

export default router;
