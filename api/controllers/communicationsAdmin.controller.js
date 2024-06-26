import Communication from "../models/communications.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { communication } from "./communications.controller.js";
export const commuincationsAdmin = async (token) => {
  try {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      next(errorHandler(401, "Unauthorized"));
    }
    const allCommunications = await Communication.find({});
    return allCommunications;
  } catch (error) {
    return error;
  }
};

export const getUsersFromCommunication = async (req, res, next) => {
  try {
    const { token } = req.query;
    const communications = await commuincationsAdmin(token);
    const usersDetails = [];

    for (const comm of communications) {
      const user = await User.findOne({ _id: comm._id }).lean();
      if (user) {
        delete user.password;  // Explicitly delete the password field
        usersDetails.push(user);
      }
    }

    res.status(200).json(usersDetails);
  } catch (error) {
    next(error);
  }
};
