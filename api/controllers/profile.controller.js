import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage"
import File from "../models/file.model.js"

export const upload = (req, next) => {
  console.log("upload Sumit");
  const  ram = 1234
  // !usermane &&  next(errorHandler(400, "All Fields are required"));
  const mongodbUrl = process.env.MONGO;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
          metadata: {
            userId: ram, // Include userId in metadata
          },
        };
        resolve(fileInfo);
      });
    },
  });
  return multer({ storage, userId:ram }).single('file');
}

export const getProfilePhoto = async (req, res, next) => {
  console.log("Sumit")
  const { userId } = req.body;
  console.log(userId)

    const photo = await File.findOne({"metadata.userId": userId}); // Correctly referencing userId from the request body
    console.log(photo);
    
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
}
