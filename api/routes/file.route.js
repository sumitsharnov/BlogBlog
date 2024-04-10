// routes/uploadFileRoute.js
import express from "express";
import { bucket } from "../index.js";
import mongoose from "mongoose";
import { upload, downloadAll } from "../controllers/file.controller.js";

const router = express.Router();

router.post("/upload", upload(), async (req, res) => {
  try {
    res.status(201).json({ text: "File uploaded successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
});
router.get("/download/:filename", async (req, res) => {
  const token = req.headers.authorization;
  try {
    // If no token is found, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { filename } = req.params;
    // Check if file exists
    const file = await bucket.find({ filename: filename }).toArray();

    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // set the headers
    res.set("Content-Type", file[0].contentType);
    res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

    // create a stream to read from the bucket
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(file[0]._id)
    );

    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: { text: `Unable to download file`, error } });
  }
});

router.get("/download/all/files", downloadAll);

export default router;
