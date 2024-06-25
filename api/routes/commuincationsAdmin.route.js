import express from "express";
import { commuincationsAdmin, getUsersFromCommunication } from "../controllers/CommunicationsAdmin.controller.js";
const router = express.Router();

router.get("/allComm", commuincationsAdmin);
router.get("/commUsers", getUsersFromCommunication);
export default router;
