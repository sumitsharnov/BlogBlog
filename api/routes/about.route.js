import express from "express";
import { about } from "../controllers/about.controller.js";

const router = express.Router();
router.get("/about", about);

export default router;
