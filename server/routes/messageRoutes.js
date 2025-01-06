import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { getMessages, getUsers, sendMessages } from '../controllers/messageControllers.js';
const router = express.Router();

router.get('/users',protectRoute,getUsers);
router.get(':/id',protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessages)
export default router;