import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

await connectCloudinary()

// Allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRouter);

app.use("/api/seller",sellerRouter)

app.use("/api/product",productRouter)

app.use("/api/cart",cartRouter)

app.use("/api/address",addressRouter)

app.use("/api/order",orderRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});