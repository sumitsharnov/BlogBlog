import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import googleauthRoutes from "./routes/authviagoogle.route.js";
import timelineRoutes from "./routes/timeline.route.js";
import testimonialRoutes from "./routes/testimonial.route.js";
import { fileURLToPath } from 'url';
import path from "path";
import pino from 'pino';
import pinoPretty from 'pino-pretty'; // Import pino-pretty
dotenv.config();

// Initialize Pino logger with pino-pretty for pretty printing
const logger = pino({
  prettifier: pinoPretty, // Use pino-pretty as the prettifier
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    logger.info("Mongo DB connected"); // Log MongoDB connection success
  })
  .catch((err) => {
    logger.error(err); // Log MongoDB connection error
  });

const app = express();
app.use(express.json());
app.use('/images', express.static("api/utils/images"));
app.listen(3000, () => {
  logger.info("Server is running"); // Log server startup
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/google", googleauthRoutes); 
app.use("/api/timeline", timelineRoutes); 
app.use("/api/testimonials", testimonialRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error(`[${statusCode}] ${message}`); // Log errors
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
