import mongoose from "mongoose";
import { Schema } from "mongoose";

const placeSchema = new Schema({
  title: String,
  address: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photos: [String],
  descriptions: String,
  features: [String],
  extraInfo: String,
  price: String,
  checkIn: String,
  checkOut: String,
  maxGuests: String,
  status: { type: String, default: "pending" },
});

const PlaceModel = mongoose.model("Place", placeSchema);

export default PlaceModel;
