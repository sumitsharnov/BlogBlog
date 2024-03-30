import express from "express";
import { testimonials } from "../controllers/testimonials.controller.js";

const router = express.Router();
router.get("/", testimonials);
export default router;