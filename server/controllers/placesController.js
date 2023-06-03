import Place from "../models/PlaceModel.js";
import jwtHelper from "../helpers/jwtHelper.js";

export const addPlaces = async (req, res) => {
  try {
    const data = req.body;
    const userInfo = await jwtHelper.verifyAccessToken(req.cookies.token);
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
    console.log(error);
  }
};

export const getPlaces = async (req, res) => {
  try {
    const userInfo = await jwtHelper.verifyAccessToken(req.cookies.token);
    const data = await Place.find({ owner: userInfo.id });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getPlacesById = async (req, res) => {
  try {
    const placeInfo = await Place.findById(req.params.id);
    res.json({ placeInfo });
  } catch (error) {
    console.error(error);
  }
};

export const updatePlace = async (req, res) => {
  try {
    const { _id, __v, ...data } = req.body;
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
    console.error(error);
  }
};
