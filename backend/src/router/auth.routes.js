import express from 'express'
import { login, logout, signup, updateuser } from '../controller/auth.controller.js';
const router = express.Router()

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout)
router.put('/update-user',updateuser)

export default router;