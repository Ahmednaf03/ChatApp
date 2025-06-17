import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";
export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        // console.log(JSON.stringify(req));
        
        const token =req.cookies.jwt 
        console.log("Token from cookies:", token);
        
        
    if(!token){
       return res.status(401).json({message:"unauthorized, no token provided"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    if(!decoded){
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
// @ts-expect-error
    req.user = user;
    next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error at protectRoute" });
    }
}