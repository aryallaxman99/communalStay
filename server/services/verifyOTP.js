import bcrypt from "bcrypt";
import jwtHelper from "../helpers/jwtHelper.js";
import otp from "../models/OtpModel.js";
import {
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
} from "../helpers/errorHandling.js";

export const verifyOTP = (req, res) => {
  return new Promise(async (resolve, reject) => {
    if (!req.cookies.otpToken)
      return reject(
        new UnauthorizedError("Token is invalid or user doesn't exist")
      );
    const { id } = await jwtHelper.verifyOTPToken(req.cookies.otpToken);
    if (!id) return reject(new ForbiddenError("Can't found user info"));
    const otpDetails = await otp.findOne({ userId: id });
    if (!otpDetails) return reject(new ForbiddenError("Something went wrong"));

    const isOtpMatched = bcrypt.compareSync(
      req.body.otp.toString(),
      otpDetails.otpHashValue
    );
    if (!isOtpMatched) return reject(new ConflictError("OTP doesn't matched"));
    resolve({
      userId: otpDetails.userId,
      type: "success",
      status: true,
    });
  });
};
