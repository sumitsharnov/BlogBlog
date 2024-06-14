import express from "express";
import {communication, getMessages, getMessagesByMessageId, addReplies, getReplies, editMessage} from "../controllers/communications.controller.js";
const router = express.Router();

router.post("/send", communication);
router.get("/getMessages", getMessages);
router.get("/getMessages/:messageId", getMessagesByMessageId);
router.post("/reply/:messageId", addReplies);
router.get("/threads/:messageId", getReplies);
router.post("/threads/:messageId", editMessage);

export default router;
