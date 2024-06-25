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
import profileRoutes from "./routes/profile.route.js";
import communications from "./routes/communication.route.js";
import communicationsAdmin from "./routes/commuincationsAdmin.route.js";
import pino from 'pino';
import pinoPretty from 'pino-pretty'; // Import pino-pretty
import { GridFSBucket } from 'mongodb';

dotenv.config();

// Initialize Pino logger with pino-pretty for pretty printing
const logger = pino({
  prettifier: pinoPretty, // Use pino-pretty as the prettifier
});

let bucket; // Declare bucket variable outside of the promise chain
let profilephotobucket;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected");
    const db = mongoose.connection.db;
    bucket = new GridFSBucket(db, { bucketName: 'filesBucket' }); // Initialize GridFS bucket
    profilephotobucket = new GridFSBucket(db, { bucketName: 'profilePhotoBucket' });
  })
  .catch((err) => {
    console.error(err); // Log MongoDB connection error
  });

// Create Express app
const app = express();

// Middleware
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

// Routes
app.use("/api", fileRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/google", googleauthRoutes); 
app.use("/api/timeline", timelineRoutes); 
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/profile/photo", profileRoutes);
app.use("/api/messages", communications);
app.use("/api/admin/comm", communicationsAdmin);


// Error handling middleware
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

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`); // Log server startup
});

// Export app and bucket separately
export { app, bucket, logger, profilephotobucket };
