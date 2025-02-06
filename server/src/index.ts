import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes";
import cookieParser from "cookie-parser";
import path from "path";

// Constants

const port = process.env.PORT || 7000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Mount all routes at /api
app.use("/api", router);

// Start server
app.listen(port, () => {
  console.log("SERVER is running on http://localhost:7000");
});
