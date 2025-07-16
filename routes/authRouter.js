import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail,
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', authMiddleware, getCurrent);
router.post('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, getCurrent);
router.patch('/avatars', authMiddleware, upload.single('avatar'), updateAvatar);
router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', resendVerificationEmail);

export default router;
