import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getUsersForSidebar } from '../controllers/message.controller';

const router = express.Router();
//@ts-expect-error
router.get('/users',protectRoute,getUsersForSidebar); 
export default router;