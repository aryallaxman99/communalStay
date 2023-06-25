import user from "../models/UserModel.js";
import otp from "../models/OtpModel.js";
import {
  ConflictError,
  ForbiddenError,
  HttpError,
  UnauthorizedError,
} from "../helpers/errorHandling.js";
import jwtHelper from "../helpers/jwtHelper.js";
import { sendOTP } from "../services/sendOTP.js";

export const verifyEmailAndSendOtpCode = async (req, res) => {
  try {
    const isEmailExists = await user.findOne({ email: req.body.email });
    if (!isEmailExists) throw new HttpError("Email not found", 406);
    const { otp, msg, type, status } = await sendOTP(isEmailExists, req, res);
    res.cookie("otp", otp).json({
      msg,
      type,
      status,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    if (!req.cookies.otp)
      throw new UnauthorizedError("Token is invalid or user doesn't exist");
    const { email } = await jwtHelper.verifyAccessToken(req.cookies.otp);
    const { otpCode } = await otp.findOne({ userId: email });
    if (!otpCode) throw new ForbiddenError("Something went wrong");
    if (otpCode !== parseInt(req.body.otp))
      throw new ConflictError("OTP doesn't matched");
    res.json({
      type: "success",
      status: true,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const verifyOTPTokenAndResetPassword = async (req, res) => {
  try {
    if (!req.cookies.otp)
      throw new UnauthorizedError("Token is invalid or user doesn't exist");
    const { email } = await jwtHelper.verifyAccessToken(req.cookies.otp);
    const { otpCode } = await otp.findOne({ userId: email });
    if (!otpCode) throw new ForbiddenError("Something went wrong");
    if (otpCode !== req.body.otpCode)
      throw new ConflictError("OTP doesn't matched");
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};
