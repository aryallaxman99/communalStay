import express from "express";
import {
  verifyEmailAndSendOtpCode,
  verifyOTP,
} from "../controllers/otpController.js";
const router = express.Router();

router.post("/identify", verifyEmailAndSendOtpCode);

router.post("/verifyOtp", verifyOTP);

export default router;
