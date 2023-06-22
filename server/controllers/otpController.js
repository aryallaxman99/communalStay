import otpGenerator from "otp-generator";
import user from "../models/UserModel.js";
import otp from "../models/OtpModel.js";
import { ForbiddenError, HttpError } from "../helpers/errorHandling.js";
import axios from "axios";

export const verifyAndSendOtpCode = async (req, res, next) => {
  try {
    const isEmailExists = await user.findOne({ email: req.body.email });
    if (!isEmailExists) throw new HttpError("Email not found", 406);

    const otpCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const phoneNumber = isEmailExists.phoneNumber;
    if (!phoneNumber) throw new ForbiddenError("Please add phoneNumber first");

    let axiosResponse = await axios.post(process.env.AAKASH_SMS_END_POINT, {
      auth_token: process.env.AAKASH_SMS_AUTH_TOKEN,
      to: phoneNumber,
      text: `communalStay OTP for reset password is ${otpCode}. Do NOT SHARE you OTP/Password with anyone.`,
    });

    if (
      typeof axiosResponse == "object" &&
      axiosResponse.hasOwnProperty("data")
    ) {
      if (axiosResponse.data.error)
        throw new HttpError("Service unavailable. Please try later", 503);

      const isOtpCodeAlreadyExists = await otp.findOne({
        email: req.body.email,
      });
      if (!isOtpCodeAlreadyExists) {
        const response = await otp.create({
          otpCode: parseInt(otpCode),
          userId: isEmailExists._id,
          email: req.body.email,
        });
        if (!response) throw new HttpError("Something went wrong", 500);
      } else {
        const response = await otp.findOneAndUpdate(
          { email: req.body.email },
          { otpCode: parseInt(otpCode) },
          { new: true }
        );
        if (!response) throw new HttpError("Something went wrong", 500);

        const lastDigitOfPhoneNumber = phoneNumber / 1000 + "";
        res.json({
          msg: `Otp sended to ***${lastDigitOfPhoneNumber.split(".")[1]}`,
          type: "success",
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};
