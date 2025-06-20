import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/users', registerUser);
router.post('/login', loginUser);

export default router;
