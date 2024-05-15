import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const getUser = async (req, res, next) => {
 try{
  const { userId, token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: userId });
  const {password:passport, ...args} = user._doc;
  res.status(200).json({...args, "type": "user"});
 }catch(error){
  next(errorHandler(403, "Invalid token"));
 }
};
