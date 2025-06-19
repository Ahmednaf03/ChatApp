import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { connectDB } from "./lib/db";
import  cookieParser  from 'cookie-parser';
const app = express();
dotenv.config();

const PORT = process.env.PORT ;


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript & Express!");
});

app.post("/test", (req: Request, res: Response) => {
  res.send("Hello?");
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});

