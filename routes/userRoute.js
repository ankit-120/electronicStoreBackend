import express from 'express';
import { createUser, getUserProfile, loginUser, logout } from '../controller/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { uploadMiddleware } from '../middlewares/upload.js';

const router = express.Router();

router.post('/register',uploadMiddleware.single('avatar'), createUser)
router.post('/login', loginUser)
router.get('/profile', isAuthenticated, getUserProfile)
router.get('/logout', logout)

export default router;