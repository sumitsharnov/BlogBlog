import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Testimonial from "../models/testimonial.model.js";

dotenv.config();
export const testimonials = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    // If no token is found, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object for future use
    req.userId = decoded.id;
    const testimonials = await Testimonial.find({}).lean();
    // Return the content JSON as a response
    res.status(200).json(testimonials);
  } catch (error) {
    // If token verification fails, return 403 Forbidden
    return res.status(403).json({ message: "Invalid token" });
  }
};
