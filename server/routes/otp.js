import express from "express";
import {
  verifyEmailAndSendOtpCode,
  verifyOTPAndSendResponse,
  verifyOTPTokenAndResetPassword,
} from "../controllers/otpController.js";
const router = express.Router();

router.post("/identify", verifyEmailAndSendOtpCode);

router.post("/verifyOTP", verifyOTPAndSendResponse);

router.put("/resetPassword", verifyOTPTokenAndResetPassword);

export default router;
