import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";
const router = express.Router();


//@ts-ignore TS incorrectly infers signup as application instance 
router.post("/signup", signup);
// @ts-ignore TS incorrectly infers login as application instance
router.post("/login", login);

router.post("/logout",logout)
// @ts-ignore TS incorrectly infers login as application instance
router.put("update-profile",protectRoute,updateProfile)
//@ts-ignore
router.get("/check", protectRoute,checkAuth)
export default router;