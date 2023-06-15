import jwtHelper from "../helpers/jwtHelper.js";
import user from "../models/UserModel.js";
import Reserve from "../models/ReserveModel.js";

export const reserve = async (req, res) => {
  try {
    const data = await req.body;
    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    const { email, phoneNumber } = await user.findById(id);
    data.userid = id;
    data.email = email;
    data.phoneNumber = phoneNumber;
    const response = await Reserve.create(data);
    if (response) {
      res.json({
        msg: "Reserved!!!",
        type: "success",
        status: true,
      });
    } else {
      res.json({
        msg: "Something went wrong",
        status: false,
        type: "error",
      });
    }
  } catch (error) {
    res.json({
      msg: "Something went wrong",
      status: false,
      type: "error",
    });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    const data = await Reserve.find({ userid: id }).populate("placeid");
    res.json(data);
  } catch (error) {
    res.json({
      msg: "Something went wrong",
      status: false,
      type: "error",
    });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const response = await Reserve.findByIdAndDelete(req.query.id);
    if (response) {
      res.json({
        msg: "Reservation canceled",
        type: "success",
        status: true,
      });
    } else {
      res.json({
        msg: "Something went wrong",
        status: false,
        type: "error",
      });
    }
  } catch (error) {
    res.json({
      msg: "Something went wrong",
      status: false,
      type: "error",
    });
  }
};
