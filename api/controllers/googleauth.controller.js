import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const googleauth = async (req, res, next) => {
  try {
    const { name, email, photoURL } = req.body;

    // Check if user exists in the database
    let user = await User.findOne({ email: email });

    if (user) {
      // Update existing user's information
      user.firstName = name.split(' ')[0];
      user.lastName = name.split(' ')[1];
      user.username = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4);
      user.photoURL = photoURL;
      await user.save();
    } else {
      // Create a new user
      const generatedPassword = Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      user = new User({
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        recruiter: false,
        photoURL: photoURL
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send response with user data and token
    const { password: pass, ...userData } = user._doc;
    res.status(200).cookie("token", token, { httpOnly: true }).json({ ...userData, token: token, type: 'thirdparty' });
  } catch (error) {
    next(error);
  }
};
