import express from "express";
import { getUser } from "./../controllers/user.controller.js";

const router = express.Router();

router.post("/userDetails", getUser);

export default router;
