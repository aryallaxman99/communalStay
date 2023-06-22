import express from "express";
import { verifyAndSendOtpCode } from "../controllers/otpController.js";
const router = express.Router();

router.post("/identify", verifyAndSendOtpCode);

export default router;
