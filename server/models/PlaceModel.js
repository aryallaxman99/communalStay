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
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
});

const PlaceModel = mongoose.model("Place", placeSchema);

export default PlaceModel;
