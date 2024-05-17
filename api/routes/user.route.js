import express from "express";
import { getUser, updateUserRecruiter } from "./../controllers/user.controller.js";

const router = express.Router();

router.post("/userDetails", getUser);
router.post("/updateRecruiter", updateUserRecruiter);

export default router;
