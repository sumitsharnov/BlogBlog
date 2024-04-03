// routes/downloadFileRoute.js
import express from "express";
import { downloadFile } from "../controllers/downloadfile.controller.js";

const router = express.Router();

router.get("/:fileId", downloadFile);

export default router;
