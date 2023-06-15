import Place from "../models/PlaceModel.js";
import jwtHelper from "../helpers/jwtHelper.js";

export const addPlaces = async (req, res) => {
  try {
    const data = req.body;
    const userInfo = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    data.owner = userInfo.id;
    const response = await Place.create(data);
    if (response) {
      res.json({
        msg: "Data added successfully",
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

export const getAllPlaces = async (req, res) => {
  try {
    const data = await Place.find();
    res.json(data);
  } catch (error) {
    res.json({
      msg: "Something went wrong",
      status: false,
      type: "error",
    });
  }
};

export const getPlacesByOwnerId = async (req, res) => {
  try {
    const userInfo = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    const data = await Place.find({ owner: userInfo.id });
    res.json(data);
  } catch (error) {
    res.json({
      msg: "Something went wrong",
      status: false,
      type: "error",
    });
  }
};

export const getPlacesById = async (req, res) => {
  try {
    const placeInfo = await Place.findById(req.params.id).populate("owner");
    res.json({ placeInfo });
  } catch (error) {
    res.json({
      msg: "Something went wrong",
      status: false,
      type: "error",
    });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const { _id, ...data } = req.body;
    const response = await Place.findByIdAndUpdate(_id, data);
    if (response) {
      res.json({
        msg: "Data updated successfully",
        status: true,
        type: "success",
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
