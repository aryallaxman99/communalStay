import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  bio: String,
  address: String,
  socialMediaAccountLink: String,
  profilePicture: String,
  userRole: String,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
