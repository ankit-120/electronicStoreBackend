import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addToCart, deleteAllProduct, deleteProduct, mycart, updateCart } from '../controller/cartController.js';

const router = express.Router();

router.post('/add', isAuthenticated, addToCart)
router.get('/mycart', isAuthenticated, mycart)
router.delete('/mycart', isAuthenticated, deleteAllProduct)
router.delete('/mycart/:id', isAuthenticated, deleteProduct)

export default router;