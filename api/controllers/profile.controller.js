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
  
  const photo = File.findOne({"metadata": {
    "userId": 1234
  }});
  console.log(photo )
}
