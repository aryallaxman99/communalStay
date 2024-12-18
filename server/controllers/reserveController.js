import jwtHelper from "../helpers/jwtHelper.js";
import user from "../models/UserModel.js";
import Reserve from "../models/ReserveModel.js";
import place from "../models/PlaceModel.js";
import {
  ConflictError,
  HttpError,
  UnauthorizedError,
} from "../helpers/errorHandling.js";

export const reserve = async (req, res) => {
  try {
    const data = await req.body;
    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    const { email, phoneNumber } = await user.findById(id);
    const { owner, maxGuests } = await place.findById(data.placeid);
    const totalGuests = await Reserve.find({ placeid: data.placeid });
    data.userid = id;
    data.email = email;
    data.phoneNumber = phoneNumber;

    const num = totalGuests.map((items) => parseInt(items.numberOfGuests));

    let sum = num.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);

    if (sum >= parseInt(maxGuests))
      throw new ConflictError("room not available");

    if (parseInt(maxGuests) < parseInt(data.numberOfGuests))
      throw new ConflictError("Cannot reserve more than maximum number guests");

    if (id == owner) throw new ConflictError("Cannot reserve your own place.");

    const response = await Reserve.create(data);
    if (!response) throw new HttpError("Something went wrong.", 500);

    res.json({
      msg: "Reserved!!!",
      type: "success",
      status: true,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    if (!req.cookies.accessToken)
      throw new UnauthorizedError("Cookies not found");
    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    const data = await Reserve.find({ userid: id }).populate("placeid");
    res.json(data);
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const getAllReservationsRequests = async (req, res) => {
  try {
    if (!req.cookies.accessToken)
      throw new UnauthorizedError("Cookies not found");
    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    const data = await Reserve.find().populate("placeid");
    if (!data) throw new HttpError("something went wrong", 500);
    const booking = data.filter((items) => items.placeid.owner == id);
    res.json(booking);
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const response = await Reserve.findByIdAndDelete(req.query.id);
    if (!response) throw new HttpError("Something went wrong", 500);
    res.json({
      msg: "Reservation canceled",
      type: "success",
      status: true,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};
