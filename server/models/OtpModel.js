import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    otpHashValue: {
      type: String,
      required: true,
    },
    nanoid: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: mongoose.Schema.Types.String, ref: "User" },
    createdAt: { type: Date, default: Date.now(), index: { expires: 300 } },
  },
  { timestamps: true }
);
const OtpModel = mongoose.model("Otp", otpSchema);

export default OtpModel;
