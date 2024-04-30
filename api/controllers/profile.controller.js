import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import ProfilePhoto from "../models/profilephoto.model.js";
import { profilephotobucket } from "../index.js";
const mongodbUrl = process.env.MONGO;

export const upload = (req, res) => {
  try {
    const userId = req.headers["userid"]; // Retrieve userId from headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token using the secret key
    try {
      console.log("Verifying");
       jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      console.log("Verifying");
       return res.status(403).json({ message: "Invalid token" });
    }

    // Handle file upload and userId as needed
    const storage = new GridFsStorage({
      url: mongodbUrl,
      file: (req, file) => {
        return new Promise(async (resolve, reject) => {
          const fileInfo = {
            filename: file.originalname,
            bucketName: "profilePhotoBucket",
            metadata: {
              userId: userId, // Include userId in metadata
            },
          };
          resolve(fileInfo);
          // const fileDetails = new ProfilePhoto(fileInfo);
          // await fileDetails.save();   for future reference
        });
      },
    });

    return multer({ storage, userId: userId }).single("file")(
      req,
      res,
      (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(400).json({ error: "Unable to upload the file" });
        }
        return res.status(201).json({ text: "File uploaded successfully!" });
      }
    );
  } catch (error) {
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
};

export const getProfilePhoto = async (req, res, next) => {
  try {
    const { userId } = req.body;
    // Validate userId
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is required in the request body" });
    }

    // Find the profile photo based on userId
    const photo = await profilephotobucket
      .find({ "metadata.userId": userId })
      .toArray();

    // Check if photo exists
    if (photo.length === 0) {
      return res
        .status(404)
        .json({ error: "Profile photo not found for the specified userId" });
    }
    const photoUrl = `/api/profile/photo/${encodeURIComponent(
      photo[0].filename
    )}`;
    return res.status(200).json({ photoUrl });
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
