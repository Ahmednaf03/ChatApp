import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getMessages, getUsersForSidebar } from '../controllers/message.controller';

const router = express.Router();
//@ts-expect-error
router.get('/users',protectRoute,getUsersForSidebar); 
//@ts-expect-error
router.get("/:id", protectRoute, getMessages)
//@ts-expect-error
router.post("/send:id",protectRoute,sendMessage)
export default router;