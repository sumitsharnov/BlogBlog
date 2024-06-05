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
        message: [message],
        user: userId,
        sentAt: timestamp,
        firstName: firstName,
        photoURL: photoURL,
      });
      messages.user = { firstName, photoURL };
      await messages.save();
      res.status(200).json({ message: "Message sent successfully" });
    } else {
      const communication = new Communication({
        _id: userId,
        messages: {
          id: randomUuid,
          message: [message],
          sentAt: timestamp,
          firstName: firstName,
          photoURL: photoURL,
        },
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

export const getMessagesByMessageId = async (req, res, next) => {
  try {
    const messageId = req.params.messageId; // Retrieve userId from headers
    const token = req.headers.authorization;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      next(errorHandler(401, "Unauthorized"));
    }
    messageId || next(errorHandler(500, "Something went wrong"));
    const message = await Communication.findOne(
      { "messages.id": messageId },
      { "messages.$": 1 }
    );
    res.status(200).json(message);
  } catch (err) {
    next(errorHandler(500, "Something went wrong"));
  }
};

export const addReplies = async (req, res, next) => {
  try {
    const messageId = req.params.messageId; // Retrieve messageId from params
    const { reply, token } = req.body;
    
    // Verify token
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return next(errorHandler(401, "Unauthorized"));
    }

    if (!messageId) {
      return next(errorHandler(500, "Something went wrong"));
    }

    // Find the document containing the message with the given messageId
    const communication = await Communication.findOne({ "messages.id": messageId });

    if (!communication) {
      return next(errorHandler(404, "Message not found"));
    }

    // Find the specific message and update its message array
    const messageIndex = communication.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) {
      return next(errorHandler(404, "Message not found"));
    }

    const s =  [...communication.messages[0].message, reply]
    communication.messages[0].message = s;

    // Save the updated document
    await communication.save();

    console.log(communication.messages[0].message, "Updated communication");
    res.status(200).json(communication.messages[0].message);
  } catch (err) {
    console.error(err);
    next(errorHandler(500, "Something went wrong"));
  }
};
