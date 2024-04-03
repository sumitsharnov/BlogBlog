// routes/uploadFileRoute.js
import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadfile.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadFile);

export default router;
