// controllers/fileController.js
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import File from "../models/file.model.js";

// Create GridFS stream
let gfs;
// Function to initialize GridFS stream

export const initGridFS = (db) => {
  gfs = Grid(db, mongoose.mongo);
  gfs.collection('files');
};

// export const initializeGridFS = initGridFS;

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { originalname, mimetype } = req.file;

  const file = new File({
    filename: originalname,
    contentType: mimetype,
  });

  try {
    await file.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadFile = async (req, res) => {
  const filename = req.params.filename;
  if (!gfs) {
    return res.status(500).json({ message: "GridFS is not initialized" });
  }

  try {
    // Find file by filename
    const file = await gfs.files.find({ filename: filename });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Read the file from GridFS
    const readstream = gfs.createReadStream({ filename: filename }); // Use mongoose.Types.ObjectId to construct ObjectID
    

    console.log(readstream, "Sumnit");

    // Set the appropriate content type and disposition
    res.set("Content-Type", file.contentType);
    res.set("Content-Disposition", `attachment; filename=${file.filename}`);

    // Stream the file to the response
    readstream.pipe(res);
  } catch (err) {
    console.error("Error reading file from GridFS:", err);
    res.status(500).json({ message: "Error reading file from GridFS" });
  }
};