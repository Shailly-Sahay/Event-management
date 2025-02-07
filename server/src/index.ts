import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Constants
const port = process.env.PORT || 7000;

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

console.log(process.env.FRONTEND_URL);

// Mount all routes at /api
app.use("/api", router);

// Start server
app.listen(port, () => {
  console.log("SERVER is running on http://localhost:7000");
});
