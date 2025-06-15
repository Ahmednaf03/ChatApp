import { Request, Response } from "express";

import User from "../modules/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";

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
            generateToken(newUser._id.toString(),res)
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

export const login = (req:Request, res:Response) => {
    res.send("signup in progress")
}

export const logout = (req:Request, res:Response) => {
    res.send("logout in progress")
}