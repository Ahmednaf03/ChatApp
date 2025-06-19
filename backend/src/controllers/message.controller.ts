import { Request, Response } from 'express';

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: { _id: string };
        }
    }
}

export const getUsersForSidebar = async (req: Request, res: Response) => {
    try {
        
        const loggedInUser = req.user?._id; // Assuming req.user is set by the protectRoute middleware
    } catch (error) {
        
    }
}