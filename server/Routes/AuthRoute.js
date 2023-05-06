import express from 'express';
import { loginUser, registerUser } from '../Controllers/AuthController.js';

const router = express.Router();
// Response of Server | Pipeline for Register User
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router;