import express from "express";
import { upload, getProfilePhoto, deleteProfilePhoto } from "../controllers/profile.controller.js"
import { profilephotobucket } from "../index.js";

const router = express.Router();

router.post("/update", upload)

router.post("/find", getProfilePhoto)

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;

  // Attempt to open download stream for the specified filename
  const downloadStream = profilephotobucket.openDownloadStreamByName(filename);

  // Listen for errors on the download stream
  downloadStream.on('error', (error) => {
    // Respond with an appropriate error message
    res.status(404).send('File not found');
  });

  // Pipe the download stream to the response
  downloadStream.pipe(res);
});

router.post("/delete", deleteProfilePhoto)
export default router;