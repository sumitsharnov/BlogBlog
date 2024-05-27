import Communication from "../models/communicatiuons.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

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
    const messages = await Communication.findOne({ _id: userId });
    const user = await User.findOne({ _id: userId });
    const { firstName, photoURL } = user._doc;
    const randomUuid = uuidv4();
    if (messages) {
      messages.messages.push({
        id: randomUuid,
        message: message,
        user: userId,
        sentAt: timestamp,
      });
      await messages.save();
      res.status(200).json({ message: "Message sent successfully" });
    } else {
      const communication = new Communication({
        _id: userId,
        messages: { id: randomUuid, message: message, sentAt: timestamp },
        user: { firstName: firstName, photoURL: photoURL },
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
    const messages = await Communication.findOne({ _id: userId });
    res.status(200).json(messages);
  } catch (err) {
    next(errorHandler(500, "Something went wrong"));
  }
};

export const getReplies = async (req, res, next) => {
  try {
    const userId = req.headers["userid"]; // Retrieve userId from headers
    const token = req.headers.authorization;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      next(errorHandler(401, "Unauthorized"));
    }
    userId || next(errorHandler(500, "Something went wrong"));
    const messages = await Communication.findOne({ _id: userId });
    res.status(200).json(messages);
  } catch (err) {
    next(errorHandler(500, "Something went wrong"));
  }
};
