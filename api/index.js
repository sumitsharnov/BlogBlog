import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import googleauthRoutes from "./routes/authviagoogle.route.js";
import timelineRoutes from "./routes/timeline.route.js";
import testimonialRoutes from "./routes/testimonial.route.js";
import certificateRoutes from "./routes/certificate.route.js";
import fileRoutes from "./routes/file.route.js";
import pino from 'pino';
import pinoPretty from 'pino-pretty'; // Import pino-pretty
import { initGridFS } from './controllers/file.controller.js';

dotenv.config();

// Initialize Pino logger with pino-pretty for pretty printing
const logger = pino({
  prettifier: pinoPretty, // Use pino-pretty as the prettifier
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected");
    initGridFS(mongoose.connection.db); // Log MongoDB connection success
  })
  .catch((err) => {
    console.error(err); // Log MongoDB connection error
  });


const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});
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
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api", fileRoutes);
app.use("/api", fileRoutes);
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
