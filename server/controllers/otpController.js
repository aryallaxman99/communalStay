import user from "../models/UserModel.js";
import { HttpError } from "../helpers/errorHandling.js";
import { sendOTP } from "../services/sendOTP.js";
import { verifyOTP } from "../services/verifyOTP.js";

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
    const { type, status } = await verifyOTP(req, res);
    console.log(type, status);
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};
