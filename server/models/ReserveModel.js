import mongoose from "mongoose";
import { Schema } from "mongoose";

const reserveSchema = new Schema({
  checkIn: String,
  checkOut: String,
  numberOfGuests: String,
  totalPrice: Number,
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: mongoose.Schema.Types.String, ref: "User" },
  phoneNumber: { type: mongoose.Schema.Types.Number, ref: "User" },
  placeid: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
});

const ReserveModel = mongoose.model("Reservation", reserveSchema);

export default ReserveModel;
