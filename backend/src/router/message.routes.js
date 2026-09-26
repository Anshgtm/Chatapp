import express from "express";
import {protecteduser} from "../middleware/profile.middleware.js";
import { recievemessage, sendmessage, getUsersForSidebar } from "../controller/message.controller.js";
const router = express.Router();
router.get('/users',protecteduser,getUsersForSidebar)
router.get('/:id',protecteduser,recievemessage)
router.post('/senders/:id',protecteduser,sendmessage)
export default router;
