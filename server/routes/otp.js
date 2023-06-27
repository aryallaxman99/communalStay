import express from "express";
import {
  sendOtp,
  verifyEmailAndSendOtpCode,
  verifyOTPAndSendResponse,
  verifyOTPTokenAndResetPassword,
} from "../controllers/otpController.js";
const router = express.Router();

router.post("/identify", verifyEmailAndSendOtpCode);

router.get("/sendOTP", sendOtp);

router.post("/verifyOTP", verifyOTPAndSendResponse);

router.put("/resetPassword", verifyOTPTokenAndResetPassword);

export default router;
