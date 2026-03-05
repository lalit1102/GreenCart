import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


await connectDB();  

//Allow multiple origins
const allowedOrigins = ["http://localhost:5173",];


// Middleware
app.use(cors({origin:allowedOrigins,credentials:true}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use("/api/user",userRouter)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});