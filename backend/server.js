import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRouter.js";

const app = express();
dotenv.config();

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // React frontend URL
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Test root route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Authentication routes
app.use("/api/auth", authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Start server
app.listen(5000, () => {
  connect();
  console.log("Connected to backend on port 5000.");
});
