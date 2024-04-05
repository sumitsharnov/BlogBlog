// controllers/fileController.js
import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage"

export const upload = () => {
  const mongodbUrl = process.env.MONGO;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage }).single('file');
}