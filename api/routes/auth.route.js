import express from "express";
import { signup, signin, guestlogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/guestlogin", guestlogin);

export default router;
