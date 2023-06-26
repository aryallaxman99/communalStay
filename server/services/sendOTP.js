import otpGenerator from "otp-generator";
import axios from "axios";
import otp from "../models/OtpModel.js";
import { ForbiddenError, HttpError } from "../helpers/errorHandling.js";
import jwtHelper from "../helpers/jwtHelper.js";

export const sendOTP = (isEmailExists, req, res) => {
  return new Promise(async (resolve, reject) => {
    const otpCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const phoneNumber = isEmailExists.phoneNumber;
    if (!phoneNumber)
      reject(new ForbiddenError("Please add phoneNumber first"));

    // let axiosResponse = await axios.post(process.env.AAKASH_SMS_END_POINT, {
    //   auth_token: process.env.AAKASH_SMS_AUTH_TOKEN,
    //   to: phoneNumber,
    //   text: `communalStay OTP for reset password is ${otpCode}. Do NOT SHARE you OTP/Password with anyone.`,
    // });

    // if (
    //   typeof axiosResponse == "object" &&
    //   axiosResponse.hasOwnProperty("data")
    // ) {
    //   if (axiosResponse.data.error)
    //     reject(new HttpError("Service unavailable. Please try later", 503));

    const isOtpCodeAlreadyExists = await otp.findOne({
      email: req.body.email,
    });
    if (!isOtpCodeAlreadyExists) {
      const response = await otp.create({
        otpCode: parseInt(otpCode),
        userId: isEmailExists._id,
        email: req.body.email,
      });
      if (!response) reject(new HttpError("Something went wrong", 500));
    } else {
      const response = await otp.findOneAndUpdate(
        { email: req.body.email },
        { otpCode: parseInt(otpCode) },
        { new: true }
      );
      if (!response) reject(new HttpError("Something went wrong", 500));
    }
    const otpToken = await jwtHelper.signOTPToken(isEmailExists._id);
    const lastDigitOfPhoneNumber = phoneNumber / 1000 + "";
    resolve({
      otp: otpToken,
      msg: `Otp sended to ***${lastDigitOfPhoneNumber.split(".")[1]}`,
      type: "success",
      status: true,
    });
    //   }
  });
};
