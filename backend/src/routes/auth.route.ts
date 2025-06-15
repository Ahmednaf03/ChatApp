import express from "express";
import { Request, Response } from "express";
import { login, logout, signup } from "../controllers/auth.controller";
const router = express.Router();


//@ts-ignore TS incorrectly infers signup as application instance 
router.post("/signup", signup);
router.get("/login", (req:Request, res:Response) => {
    res.send("login in progress")
})

// router.post("/logout",)
export default router;