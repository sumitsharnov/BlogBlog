import express from "express";
import { certifications } from "../controllers/certifications.controller.js";

const router = express.Router();
router.get("/cfts", certifications);
export default router;