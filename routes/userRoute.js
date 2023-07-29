import express from 'express';
import { createUser, getUserProfile, loginUser, logout } from '../controller/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/profile', isAuthenticated, getUserProfile)
router.get('/logout', logout)

export default router;