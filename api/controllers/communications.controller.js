import Communication from "../models/communicatiuons.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { Timestamp } from "mongodb";

export const communication = async (req, res, next) => {
  try {
    const { userId, message, token } = req.body;
    const timestamp = new Date().toISOString();
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      next(errorHandler(401, "Unauthorized"));
    }
    userId || next(errorHandler(500, "Something went wrong"));
    const messages = await Communication.findOne({ user: userId });
    if (messages) {
      messages.messages.push({
        message: message,
        user: userId,
        sentAt: timestamp,
      });
      await messages.save();
      res.status(200).json({ message: "Message sent successfully" });
    } else {
      const communication = new Communication({
        messages: { message: message, user: userId },
        user: userId,
        sentAt: timestamp,
      });
      await communication.save();
      res.status(200).json({ message: "Message sent successfully" });
    }
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const userId = req.headers["userid"]; // Retrieve userId from headers
    const token = req.headers.authorization;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      next(errorHandler(401, "Unauthorized"));
    }
    userId || next(errorHandler(500, "Something went wrong"));
    const messages = await Communication.findOne({ user: userId });
    res.status(200).json(messages);
  } catch (err) {
    next(errorHandler(500, "Something went wrong"));
  }
};
