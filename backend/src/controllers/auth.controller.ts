import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";
import { log } from "console";

export const signup = async  (req:Request, res:Response) => {
    const {fullName, email, password} = req.body
    try {
        if(password.length < 6){
                
            return res.status(400).json({message:"password not strong enough, should be at least 6 characters"})
        }
        const user = await User.findOne({email})
        if(user){

            return res.status(400).json({message:"email already exists"})
        }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if (newUser){
            generateToken(newUser._id.toString(),res as Response);
            await newUser.save()
            res.status(201).json({
                message: "User created successfully",
                user: {
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePic: newUser.profilePic,
                    password: newUser.password, // Consider removing this from the response for security reasons
                }
            })
        } else {
            return res.status(500).json({message:"user not created erorr from line 27" })
        }
        } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"invalid credentials"})
        }
       const isPasswordValid :boolean = await bcrypt.compare(password, user.password!)
       if(!isPasswordValid){
            return res.status(400).json({message:"invalid credentials"})
        }
        generateToken(user._id.toString(), res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
       }
    catch (error) {
        log("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req:Request, res:Response) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller:", error);
        res.status(500).json({message:"Internal server error"})
        
    }
}

export const updateProfile = async (req:Request, res:Response) => {
    try {
        const {profilePic} = req.body;
        // @ts-expect-error 
      const  userId = req.user_id
      if(!profilePic){
        return res.status(400).json({message:"profile pic is required"})
          
      }
      const uploadResult = await cloudinary.uploader.upload(profilePic)
      const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadResult.secure_url}, {new:true})
      res.status(200).json({
        message: "Profile updated successfully",})
    } catch (error) {
        console.log("Error in updateProfile controller:", error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth = (req: Request, res: Response) => {
try {
    log("User from request:", req.cookies.jwt);

    res.status(200).json(req.user);
} catch (error) {
    console.log("Error in checkAuth controller:", error);
    res.status(500).json({ message: "Internal server error at checkAuth" });
}
}