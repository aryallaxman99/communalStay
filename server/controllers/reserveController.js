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
    const { owner } = await place.findById(data.placeid);

    data.userid = id;
    data.email = email;
    data.phoneNumber = phoneNumber;

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
