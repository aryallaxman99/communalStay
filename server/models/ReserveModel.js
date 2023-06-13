import mongoose from "mongoose";
import { Schema } from "mongoose";

const reserveSchema = new Schema({
  checkIn: String,
  chckOut: String,
  numberOfGuests: String,
  totalPrice: Number,
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: mongoose.Schema.Types.String, ref: "User" },
  phoneNumber: { type: mongoose.Schema.Types.Number, ref: "User" },
});

const ReserveModel = mongoose.model("Reservation", reserveSchema);

export default ReserveModel;
