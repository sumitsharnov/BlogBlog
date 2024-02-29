import User from "../models/user.model.js";
import bcryt from "bcryptjs";
import jwt from "jsonwebtoken";
export const googleauth = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userByEmail = await User.findOne({ email: email });
    let user = "";
    user = userByEmail && userByEmail;
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...args } = user._doc;
      res
        .status(200)
        .cookie("token", token, {
          hTTPOnly: true,
        })
        .json(args);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryt.hash(generatedPassword, 10);
      const newUser = new User({
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        recruiter: false,
      });
      user= newUser;
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...args } = user._doc;
      res
        .status(200)
        .cookie("token", token, {
          hTTPOnly: true,
        })
        .json(args);
    }
  } catch (error) {
    next(error);
  }
};
