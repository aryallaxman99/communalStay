import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new Schema({
  otpCode: {
    type: Number,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: mongoose.Schema.Types.String, ref: "User" },
});

const OtpModel = mongoose.model("Otp", otpSchema);

export default OtpModel;
