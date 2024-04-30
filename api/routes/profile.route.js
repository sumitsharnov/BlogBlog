import express from "express";
import { upload, getProfilePhoto } from "../controllers/profile.controller.js"
import { profilephotobucket } from "../index.js";

const router = express.Router();

router.post("/update", upload)

router.get("/find", getProfilePhoto)

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const downloadStream = profilephotobucket.openDownloadStreamByName(filename);
  downloadStream.pipe(res);
});


export default router;