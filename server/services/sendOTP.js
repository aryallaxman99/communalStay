import otpGenerator from "otp-generator";
import axios from "axios";
import bcrypt from "bcrypt";
import { customRandom, urlAlphabet, random } from "nanoid";
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
    const nanoid = customRandom(urlAlphabet, 58, random);
    console.log({ otpCode });
    const phoneNumber = isEmailExists.phoneNumber;
    if (!phoneNumber)
      return reject(new ForbiddenError("Please add phoneNumber first"));

    let axiosResponse = await axios.post(process.env.AAKASH_SMS_END_POINT, {
      auth_token: process.env.AAKASH_SMS_AUTH_TOKEN,
      to: phoneNumber,
      text: `communalStay OTP for reset password is ${otpCode}. Do NOT SHARE your OTP/Password with anyone.`,
    });

    if (
      typeof axiosResponse == "object" &&
      axiosResponse.hasOwnProperty("data")
    ) {
      if (axiosResponse.data.error)
        return reject(
          new HttpError("Service unavailable. Please try later", 503)
        );

      const salt = bcrypt.genSaltSync(10);
      const otpHashValue = bcrypt.hashSync(otpCode, salt);
      const isOtpCodeAlreadyExists = await otp.findOne({
        email: req.body.email,
      });
      if (!isOtpCodeAlreadyExists) {
        const response = await otp.create({
          otpHashValue: otpHashValue,
          nanoid: nanoid(),
          userId: isEmailExists._id,
          email: req.body.email,
        });
        if (!response)
          return reject(new HttpError("Something went wrong", 500));
      } else {
        const data = {
          nanoid: nanoid(),
          otpHashValue: otpHashValue,
        };
        const response = await otp.findByIdAndUpdate(
          isOtpCodeAlreadyExists._id,
          data,
          { new: true }
        );
        if (!response)
          return reject(new HttpError("Something went wrong", 500));
      }

      const authToken = await jwtHelper.signOTPToken(isEmailExists._id);
      const lastDigitOfPhoneNumber = phoneNumber / 1000 + "";
      resolve({
        authToken: authToken,
        msg: `Otp sended to ***${lastDigitOfPhoneNumber.split(".")[1]}`,
        type: "success",
        status: true,
      });
    }
  });
};
