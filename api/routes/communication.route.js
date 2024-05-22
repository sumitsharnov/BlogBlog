import express from "express";
import {communication, getMessages} from "../controllers/communications.controller.js";
const router = express.Router();

router.post("/send", communication);
router.get("/getMessages", getMessages);

export default router;
