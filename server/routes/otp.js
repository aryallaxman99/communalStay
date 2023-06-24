import express from "express";
import {
  verifyEmailAndSendOtpCode,
  verifyOTP,
  verifyOTPTokenAndResetPassword,
} from "../controllers/otpController.js";
const router = express.Router();

router.post("/identify", verifyEmailAndSendOtpCode);

router.post("/verifyOtp", verifyOTP);

router.put("/resetPassword", verifyOTPTokenAndResetPassword);

export default router;
