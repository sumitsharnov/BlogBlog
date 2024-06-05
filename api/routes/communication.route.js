import express from "express";
import {communication, getMessages, getMessagesByMessageId, addReplies} from "../controllers/communications.controller.js";
const router = express.Router();

router.post("/send", communication);
router.get("/getMessages", getMessages);
router.get("/getMessages/:messageId", getMessagesByMessageId);
router.post("/reply/:messageId", addReplies);

export default router;
