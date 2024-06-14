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
    userId || next(errorHandler(500, "User is not authorized"));
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
        firstName: firstName,
        photoURL: photoURL,
      });
      messages.user = { firstName, photoURL };
      messages.reactions = "";
      await messages.save();
      res.status(200).json({ message: "Message sent successfully" });
    } else {
      const communication = new Communication({
        _id: userId,
        messages: {
          id: randomUuid,
          message: message,
          sentAt: timestamp,
          firstName: firstName,
          photoURL: photoURL,
          user: userId,
          replies: [],
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
    if (messages)
      for (const message of messages.messages) {
        const user = await User.findOne({ _id: message.user });
        const { photoURL } = user._doc;
        message.photoURL = photoURL;
      }
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
    const { reply, token, userId } = req.body;
    const randomUuid = uuidv4();
    // Verify token
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      next(errorHandler(401, "Unauthorized"));
    }

    if (!messageId) {
      return next(errorHandler(400, "Message ID is missing"));
    }

    // Find the communication document containing the message with the given messageId
    const communication = await Communication.findOne({
      "messages.id": messageId,
    });
    if (!communication) {
      return next(errorHandler(404, "Communication not found"));
    }

    // Find the specific message and update its replies array
    const messageIndex = communication.messages.findIndex(
      (msg) => msg.id === messageId
    );
    if (messageIndex === -1) {
      return next(errorHandler(404, "Message not found in the communication"));
    }

    // Construct the reply object including the photoURL and firstName
    const replyWithSenderInfo = {
      id: randomUuid,
      message: reply, // Assuming 'reply' is a string containing the reply message
      photoURL: communication.messages[messageIndex].photoURL,
      firstName: communication.messages[messageIndex].firstName,
      sentAt: new Date().toISOString(),
      user: userId,
    };

    // Use findOneAndUpdate with the $push operator to add the reply to the correct message
    const updatedCommunication = await Communication.findOneAndUpdate(
      { "messages.id": messageId },
      { $push: { "messages.$.replies": replyWithSenderInfo } },
      { new: true } // Return the updated document
    );

    if (!updatedCommunication) {
      return next(
        errorHandler(404, "Communication not found or update failed")
      );
    }

    res.status(200).json("Posted a reply");
  } catch (err) {
    console.error(err);
    next(errorHandler(500, "An error occurred while saving the reply"));
  }
};

export const getReplies = async (req, res, next) => {
  try {
    const messageId = req.params.messageId; // Retrieve messageId from params

    if (!messageId) {
      return next(new Error("Message ID is missing"));
    }

    // Find the communication document containing the message with the given messageId
    const communication = await Communication.findOne(
      { "messages.id": messageId },
      { "messages.$": 1 }
    );
    if (!communication) {
      return next(new Error("Communication not found"));
    }

    // Extract the replies from the message
    const messageIndex = communication.messages.findIndex(
      (msg) => msg.id === messageId
    );
    if (messageIndex === -1) {
      return next(new Error("Message not found in the communication"));
    }
    const replies = communication.messages[messageIndex].replies;
    if (replies)
      for (const reply of replies) {
        const user = await User.findOne({ _id: reply.user });
        const { photoURL } = user._doc;
        reply.photoURL = photoURL;
      }
    // Respond with the replies array
    res.status(200).json(replies);
  } catch (err) {
    console.error(err);
    next(new Error("An error occurred while retrieving the replies"));
  }
};

export const editMessage = async (req, res, next) => {
  try {
    const messageId = req.params.messageId; // Retrieve messageId from params
    const { token, editedText } = req.body;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      next(errorHandler(401, "Unauthorized"));
    }
    if (!messageId) {
      return next(new Error("Message ID is missing"));
    }

    // Find the communication document containing the message with the given messageId
    const communication = await Communication.findOne(
      { "messages.id": messageId },
      { "messages.$": 1 }
    );
    if (!communication) {
      return next(new Error("Communication not found"));
    }

    const updatedMessage = await Communication.findOneAndUpdate(
      { "messages.id": messageId },
      { $set: { "messages.$.message": editedText } },
      { $set: { "messages.$.edit": true } },
      { new: true } // Return the updated document
    );

    res.status(200).json("Message edited successfully");
  } catch (err) {
    next(errorHandler(500, "Something went wrong"));
  }
};
