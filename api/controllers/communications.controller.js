import Communication from "../models/communications.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

export const communication = async (req, res, next) => {
  try {
    let { communicationUserId, currentUserId, message, token, userType } =
      req.body;
    const timestamp = new Date().toISOString();
    let messages = "";
    let user = "";
    communicationUserId = communicationUserId || currentUserId;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      next(errorHandler(401, "Unauthorized"));
      return;
    }
    currentUserId ||
      next(errorHandler(500, "User is not authorized"));
    if (currentUserId === communicationUserId) {
      messages = await Communication.findOne({ _id: communicationUserId });
      user = await User.findOne({ _id: communicationUserId });
    } else {
      messages = await Communication.findOne({ _id: communicationUserId });
      user = await User.findOne({ _id: currentUserId });
    }

    const { firstName, photoURL } = user._doc;
    const randomUuid = uuidv4();
    if (messages) {
      messages.messages.push({
        id: randomUuid,
        message: message,
        user: currentUserId,
        sentAt: timestamp,
        firstName: firstName,
        photoURL: photoURL,
        read: false,
        delete:false
      });
      messages.user = { firstName, photoURL };
      messages.reactions = "";
      await messages.save();
      res.status(200).json({ message: "Message sent successfully" });
    } else {
      const communication = new Communication({
        _id: currentUserId,
        messages: {
          id: randomUuid,
          message: message,
          sentAt: timestamp,
          firstName: firstName,
          photoURL: photoURL,
          user: currentUserId,
          replies: [],
          read: false,
          delete:false
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
    const timestamp = new Date().toISOString();
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

    const user = await User.findOne({ _id: userId });
    // Construct the reply object including the photoURL and firstName
    const replyWithSenderInfo = {
      id: randomUuid,
      message: reply, // Assuming 'reply' is a string containing the reply message
      photoURL: user.photoURL,
      firstName: user.firstName,
      sentAt: timestamp,
      user: userId,
      read: false,
    };

    if (communication && communication.messages.some(msg => msg.id === messageId && msg.delete)) {
      throw new Error("Cannot update replies for a deleted message.");
    }
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

    // Verify the token
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return next(errorHandler(401, "Unauthorized"));
    }

    // Check if messageId is provided
    if (!messageId) {
      return next(new Error("Message ID is missing"));
    }

    // Find the communication document containing the message with the given messageId
    const communication = await Communication.findOne(
      { "messages.id": messageId },
      { "messages.$": 1 }
    );

    // Check if communication is found
    if (!communication) {
      return next(new Error("Communication not found"));
    }

    // If editedText is empty, delete the message
    // if (!editedText.trim()) {
    //   const updatedCommunication = await Communication.findOneAndUpdate(
    //     { "messages.id": messageId },
    //     { $pull: { messages: { id: messageId } } },
    //     { new: true }
    //   );
    //   return res.status(200).json("Message deleted successfully");
    // }

    //If edited text is empty, update the message to this message has been deleted.

    // If editedText is not empty, update the message
    const updatedMessage = await Communication.findOneAndUpdate(
      { "messages.id": messageId },
      {
        $set: {
          "messages.$.message": editedText.trim() ? editedText : "This message has been deleted.",
          "messages.$.edit": editedText.trim() ? true : false,
          "messages.$.delete": editedText.trim() ? false : true,
        },
      },
      { new: true } // Return the updated document
    );

    res.status(200).json("Message edited successfully");
  } catch (err) {
    next(errorHandler(500, "Something went wrong"));
  }
};

export const editReply = async (req, res, next) => {
  try {
    const messageId = req.params.messageId;
    const { replyId, editedText, token } = req.body;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return next(errorHandler(401, "Unauthorized"));
    }

    // Find the communication document by message ID
    const communication = await Communication.findOne({
      "messages.id": messageId,
    });
    if (!communication)
      return res.status(404).json({ error: "Message not found" });

    const reply = communication.messages
      .find((msg) => msg.id === messageId)
      .replies.find((rep) => rep.id === replyId);
    if (!reply) return res.status(404).json({ error: "Reply not found" });

    reply.message = editedText;
    reply.edit = true;
    await communication.save();

    return res.status(200).json({ message: "Reply updated successfully" });
  } catch (error) {
    console.error("Error updating reply:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const messageId = req.params.messageId;
    const { token } = req.body;

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const communication = await Communication.findOneAndUpdate(
      { "messages.id": messageId },
      { $set: { "messages.$.read": true } },
      { new: true }
    );

    if (!communication) return res.status(404).json({ error: "Message not found" });

    return res.status(200).json({ message: "Marked as read successfully" });
  } catch (error) {
    console.error("Error marking message as read:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const markReplyAsRead = async (req, res, next) => {
  try {
    const { replyId, messageId, token } = req.body;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return next(errorHandler(401, "Unauthorized"));
    }

    // Find the communication document by message ID
    const communication = await Communication.findOne({
      "messages.id": messageId,
    });
    if (!communication)
      return res.status(404).json({ error: "Message not found" });

    const reply = communication.messages
      .find((msg) => msg.id === messageId)
      .replies.find((rep) => rep.id === replyId);
    if (!reply) return res.status(404).json({ error: "Reply not found" });

    reply.read = true;
    await communication.save();

    return res.status(200).json({ message: "Reply marked as read successfully" });
  } catch (error) {
    console.error("Error updating reply:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};