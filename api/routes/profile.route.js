import express from "express";
import { upload, getProfilePhoto } from "../controllers/profile.controller.js"

const router = express.Router();

router.post("/update", upload(), async (req, res) => {
    try {
      res.status(201).json({ text: "File uploaded successfully !" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: { text: "Unable to upload the file", error },
      });
    }
  });

router.get("/find", getProfilePhoto)

export default router;