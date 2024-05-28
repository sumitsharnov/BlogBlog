import express from "express";
import {communication, getMessages, getMessagesByMessageId} from "../controllers/communications.controller.js";
const router = express.Router();

router.post("/send", communication);
router.get("/getMessages", getMessages);
router.get("/getMessages/:messageId", getMessagesByMessageId);

export default router;
