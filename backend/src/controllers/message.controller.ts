import { Request, Response } from 'express';
import User from './../models/user.model';
import Message from '../models/message.model';
import cloudinary from '../lib/cloudinary';

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
    const filteredUsers = await User.find({_id:{$ne: loggedInUser}}).select("-password -__v");
    res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar controller:", error);
        res.status(500).json({ message: "Internal server error in getting users" });
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const userToChatId = req.params.id;
        const myId = req.user?._id; 
        const messages = await Message.find({
            $or:[
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error);
        res.status(500).json({ message: "Internal server error in getting messages" });
        
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { text,image } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user?._id; 
        let imageUrl
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();
        // todo: realtime functionality goes here via socker.io
        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.log("Error in sendMessage controller:", error);
        res.status(500).json({ message: "Internal server error in sending message" });
        
    }
}