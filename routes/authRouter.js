import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', authMiddleware, getCurrent);
router.post('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, getCurrent);

export default router;
