import express from "express";
import { timeline } from "./../controllers/timeline.controller.js";

const router = express.Router();
router.get("/content", timeline);
export default router;