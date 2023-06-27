import user from "../models/UserModel.js";
import {
  ConflictError,
  ForbiddenError,
  HttpError,
} from "../helpers/errorHandling.js";
import { sendOTP } from "../services/sendOTP.js";
import { verifyOTP } from "../services/verifyOTP.js";
import bcrypt from "bcrypt";

export const verifyEmailAndSendOtpCode = async (req, res) => {
  try {
    const isEmailExists = await user.findOne({ email: req.body.email });
    if (!isEmailExists) throw new HttpError("Email not found", 406);
    const { otp, msg, type, status } = await sendOTP(isEmailExists, req, res);
    res.cookie("otp", otp, { maxAge: 3600000 }).json({
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

export const verifyOTPAndSendResponse = async (req, res) => {
  try {
    const { type, status } = await verifyOTP(req, res);
    res.json({ type, status });
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
    if (!req.body.otp)
      throw new ForbiddenError("Something went wrong. Try again");
    const { status, userId } = await verifyOTP(req, res);
    if (status && req.body.newPassword !== req.body.confirmPassword)
      throw new ConflictError("Password doesn't matched");
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.newPassword, salt);
    const response = await user.findByIdAndUpdate(
      userId,
      { password },
      {
        new: true,
      }
    );
    if (!response) throw new HttpError("Something went wrong", 500);
    res.json({
      msg: "Password reset successfully",
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
