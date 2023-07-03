import user from "../models/UserModel.js";
import {
  ConflictError,
  ForbiddenError,
  HttpError,
} from "../helpers/errorHandling.js";
import { sendOTP } from "../services/sendOTP.js";
import { verifyOTP } from "../services/verifyOTP.js";
import bcrypt from "bcrypt";
import jwtHelper from "../helpers/jwtHelper.js";

export const verifyEmailAndSendOtpCode = async (req, res) => {
  try {
    if (typeof req.body == "object" && req.body.hasOwnProperty("email")) {
      const isEmailExists = await user.findOne({ email: req.body.email });
      if (!isEmailExists) throw new HttpError("Email not found", 406);
      const { authToken, msg, type, status } = await sendOTP(
        isEmailExists,
        req,
        res
      );
      res.cookie("authToken", authToken).json({
        msg,
        type,
        status,
      });
    } else {
      if (!req.cookies.refreshToken)
        throw new ForbiddenError("Something went wrong. Try again");
      const { id } = await jwtHelper.verifyRefreshToken(
        req.cookies.refreshToken
      );
      const { email } = await user.findById(id);
      const isEmailExists = await user.findOne({ email });
      if (!isEmailExists) throw new HttpError("Email not found", 406);
      const { authToken, msg, type, status } = await sendOTP(
        isEmailExists,
        req,
        res
      );
      res.cookie("authToken", authToken).json({
        msg,
        type,
        status,
      });
    }
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
    const { randomValue, type, status } = await verifyOTP(req, res);
    res.json({ randomValue, type, status });
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
    const { randomValue, status, userId } = await verifyOTP(req, res);
    if (status && randomValue !== req.body.randomValue)
      throw new ForbiddenError("Something went wrong. Try later");
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
    res.clearCookie("authToken").json({
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

export const sendOtp = async (req, res) => {
  try {
    if (!req.cookies.refreshToken)
      throw new ForbiddenError("Something went wrong");
    const { id } = await jwtHelper.verifyRefreshToken(req.cookies.refreshToken);
    const userDetails = await user.findById(id);
    req.body.email = userDetails.email;
    const { authToken, msg, type, status } = await sendOTP(
      userDetails,
      req,
      res
    );
    res.cookie("authToken", authToken).json({
      msg,
      type,
      status,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.msg,
      type: "error",
      status: false,
    });
  }
};
