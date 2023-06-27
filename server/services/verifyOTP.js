import jwtHelper from "../helpers/jwtHelper.js";
import otp from "../models/OtpModel.js";
import {
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
} from "../helpers/errorHandling.js";

export const verifyOTP = (req, res) => {
  return new Promise(async (resolve, reject) => {
    if (!req.cookies.otp)
      reject(new UnauthorizedError("Token is invalid or user doesn't exist"));
    const { id } = await jwtHelper.verifyOTPToken(req.cookies.otp);
    if (!id) reject(new ForbiddenError("Something went wrong"));
    const { otpCode, userId } = await otp.findOne({ userId: id });
    if (!otpCode) reject(new ForbiddenError("Something went wrong"));
    if (otpCode !== parseInt(req.body.otp))
      reject(new ConflictError("OTP doesn't matched"));
    resolve({
      userId,
      type: "success",
      status: true,
    });
  });
};
