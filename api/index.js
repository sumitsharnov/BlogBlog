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
import pinoPretty from 'pino-pretty';
import { GridFSBucket } from 'mongodb';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { getUnreadMessages } from "./controllers/communications.controller.js";

dotenv.config();

// Initialize Pino logger with pino-pretty for pretty printing
const logger = pino({
  prettifier: pinoPretty, 
});

let bucket;
let profilephotobucket;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected");
    const db = mongoose.connection.db;
    bucket = new GridFSBucket(db, { bucketName: 'filesBucket' });
    profilephotobucket = new GridFSBucket(db, { bucketName: 'profilePhotoBucket' });
  })
  .catch((err) => {
    console.error(err); 
  });

// Create Express app
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Map();

wss.on('connection', ws => {
  ws.on('message', async message => {
    const data = JSON.parse(message);
    if (data.type === 'init') {
      try {
        jwt.verify(data.token, process.env.JWT_SECRET);
        clients.set(ws, { userId: data.userId, token: data.token });
      } catch (e) {
        ws.send(JSON.stringify({ error: 'Unauthorized' }));
        ws.close();
      }
    } else {
      console.log(`Received message => ${message}`);
    }
  });

  const sendUnreadMessages = async () => {
    for (const [client, { userId, token }] of clients.entries()) {
      try {
        const unreadMessages = await getUnreadMessages(userId, token);
        client.send(JSON.stringify({ unreadMessages }));
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.error("Token expired:", error);
          client.send(JSON.stringify({ error: "Token expired" }));
        } else {
          console.error("Error fetching unread messages:", error);
          client.send(JSON.stringify({ error: "Error fetching unread messages" }));
        }
      }
    }
  };

  const debounceInterval = 5000; // 15 seconds
  let debounceTimeout;

  const debounceSendUnreadMessages = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(sendUnreadMessages, debounceInterval);
  };

  const intervalId = setInterval(debounceSendUnreadMessages, debounceInterval);

  ws.on('close', () => {
    clearInterval(intervalId);
    clients.delete(ws);
  });
});
const corsOptions = {
  origin: ['http://localhost:5173','https://sumits-portfolio-2tkv.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'userId', 'messageId'],
};

app.use(cors(corsOptions));
// app.use(express.static(path.resolve(__dirname, 'client', 'dist'))); 

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
app.use('/images', express.static(path.join(__dirname, 'utils/images')));


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

// Catch-all route to serve index.html for any route not matched by the API
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error(`[${statusCode}] ${message}`);
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Export app and bucket separately
export { app, bucket, logger, profilephotobucket };
