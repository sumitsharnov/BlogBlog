import express from "express";
import { googleauth } from "./../controllers/googleauth.controller.js"

const router = express.Router();
router.post("/googleauth", googleauth);
export default router;
