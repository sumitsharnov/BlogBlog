import express from "express";
import { certifications } from "../controllers/certifications.controller.js";

const router = express.Router();
router.get("/", certifications);
export default router;