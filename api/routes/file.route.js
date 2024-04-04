// routes/uploadFileRoute.js
import express from "express";
import multer from "multer";
import { uploadFile, downloadFile } from "../controllers/file.controller.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/upload", upload.single("file"), uploadFile);
router.get('/download/:filename', downloadFile);

export default router;
