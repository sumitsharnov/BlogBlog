import dotenv from "dotenv";
import About from "../models/about.model.js";

dotenv.config();

export const about = async (req, res, next) => {
  try {
    // Attach the user ID to the request object for future use
    const about = await About.find({}).lean();
    console.log(about, "Sumit");
    // Return the content JSON as a response
    res.status(200).json(about);
  } catch (error) {
    // If token verification fails, return 403 Forbidden
    return res.status(403).json({ message: "Invalid token" });
  }
};
