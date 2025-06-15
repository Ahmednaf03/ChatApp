import { Response } from 'express';
import jwt from 'jsonwebtoken';
export const generateToken = (userId:string, res:Response) =>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
    });
    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
    });
    return token;
}