import express from "express";
import {communication, getMessages, getMessagesByMessageId, addReplies, getReplies, editMessage, editReply, markAsRead, markReplyAsRead, getUnreadMessages, getUnreadReplies} from "../controllers/communications.controller.js";
const router = express.Router();

router.post("/send", communication);
router.get("/getMessages", getMessages);
router.get("/getMessages/:messageId", getMessagesByMessageId);
router.post("/reply/:messageId", addReplies);
router.get("/threads/:messageId", getReplies);
router.post("/editMessage/:messageId", editMessage);
router.post("/editReply/:messageId", editReply);
router.post("/markRead/:messageId", markAsRead);
router.post("/markReplyRead", markReplyAsRead);
router.get("/getUnreadMessages", getUnreadMessages);
router.get("/getUnreadReplies", getUnreadReplies)

export default router;
