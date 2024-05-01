import User from "../models/user.model.js";
import GuestUser from "../models/guest.model.js";
import bcryt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { firstName, lastName, username, email, password, isRecruiter } = req.body;
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    firstName === "" ||
    lastName === "" ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All Fields are required"));
  }
  const hashedPassword = bcryt.hashSync(password, 10);
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: hashedPassword,
    recruiter: isRecruiter,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "Sign up successful" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password  || email === ""|| password === "") {
    return next(errorHandler(400, "All Fields are required"));
  }
  try {
    const userByEmail = await User.findOne({ email: email });
    const userByUsername = await User.findOne({ username: email });
    let user="";
    if(userByEmail) user=userByEmail
    if(userByUsername) user=userByUsername
    if (!user) {
      return next(errorHandler(401, "Invalid Credentials"));
    }
    const isMatch = bcryt.compareSync(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid Credentials"));
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    const {password : pass, ...args} = user._doc;
    res.status(200).cookie("token", token,  {
      hTTPOnly: true,
    }).json({...args, token: token, type: "user"});
  } catch (error) {
    return next(error);
  }
}

export const guestlogin = async (req, res, next) => {
  try {
    const { name, recruiter } = req.body;
    const newGuestUser = new GuestUser({ name: name, recruiter: recruiter });
    const token = jwt.sign({ type: 'guest' }, process.env.JWT_SECRET, { expiresIn: 15 }); // Token expires in 1 hour
    
    // Set the cookie
    res.cookie("token", token, { httpOnly: true });
    
    // Send the JSON response
    res.status(200).json({ token: token, firstName: name ? name : "Guest", type: 'guest' });
    
    // Save the new guest user if name or recruiter is provided
    if (name || recruiter) {
      await newGuestUser.save();
    }
  } catch (error) {
    return next(error);
  }
};


