// controllers/fileController.js
import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage"
import { bucket } from "../index.js";
import archiver from "archiver";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
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

export const downloadAll = async (req, res, next) => {
  try {
    const files = await bucket.find().toArray();
    if (files.length === 0) {
      return res.status(404).json({ error: { text: "No files found" } });
    }
    res.set("Content-Type", "application/zip");
    res.set("Content-Disposition", `attachment; filename=files.zip`);
    res.set("Access-Control-Allow-Origin", "*");
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.pipe(res);

    files.forEach((file) => {
      const downloadStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(file._id)
      );
      archive.append(downloadStream, { name: file.filename });
    });

    archive.finalize();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to download files`, error },
    });
  }
}