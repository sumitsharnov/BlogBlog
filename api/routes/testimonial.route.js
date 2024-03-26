import express from "express";
import { testimonials } from "./../controllers/testimonials.js";

const router = express.Router();
router.get("/", testimonials);
export default router;