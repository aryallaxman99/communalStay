import Fuse from "fuse.js";
import Place from "../models/PlaceModel.js";
import jwtHelper from "../helpers/jwtHelper.js";
import {
  ForbiddenError,
  HttpError,
  NotFoundError,
} from "../helpers/errorHandling.js";

export const addPlaces = async (req, res) => {
  try {
    const data = req.body;
    const userInfo = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    data.owner = userInfo.id;
    const response = await Place.create(data);
    if (!response) throw new HttpError("Something went wrong", 500);
    res.json({
      msg: "Data added successfully",
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

export const getAllPlaces = async (req, res) => {
  try {
    const data = await Place.find();
    if (!data) throw new HttpError("Something went wrong", 500);
    res.json(data);
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const placesByUserReq = async (req, res) => {
  try {
    const limit = req.query.limit || 8;
    const page = req.query.page;
    const skipCount = limit * page - limit;

    const data = await Place.find().skip(skipCount).limit(limit);
    const totalDataLength = await Place.find().count();

    if (!data) throw new HttpError("Something went wrong", 500);
    res.json({ data: data, total: totalDataLength });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const getPlacesByOwnerId = async (req, res) => {
  try {
    const userInfo = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    if (!userInfo) throw new ForbiddenError("Invalid cookie");
    const data = await Place.find({ owner: userInfo.id });
    if (!data) throw new HttpError("Something went wrong", 500);
    res.json(data);
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const getPlacesById = async (req, res) => {
  try {
    if (req.params.id === undefined)
      throw new ForbiddenError("No any id found");
    const placeInfo = await Place.findById(req.params.id).populate("owner");
    if (!placeInfo) throw new NotFoundError("No any Records Found");
    res.json({ placeInfo });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const { _id, ...data } = req.body;
    const response = await Place.findByIdAndUpdate(_id, data);
    if (!response) throw new HttpError("Something went wrong", 500);
    res.json({
      msg: "Data updated successfully",
      status: true,
      type: "success",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const searchPlaces = async (req, res) => {
  try {
    const data = await Place.find();
    if (!data) throw new HttpError("Something went wrong", 500);
    const options = {
      includeScore: false,
      isCaseSensitive: false,
      includeMatches: true,
      findAllMatches: true,
      minMatchCharLength: 3,
      keys: ["title"],
    };
    const result = new Fuse(data, options).search(req.query.q);
    res.json({ data: result });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
  }
};

export const deletePlaceById = async (req, res) => {
  try {
    const response = await Place.findByIdAndDelete(req.query.id);
    if (!response) throw new HttpError("Something went wrong", 500);
    res.json({
      msg: "HomeStay Deleted",
      type: "success",
      status: true,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      type: "error",
      status: false,
    });
    console.log(error);
  }
};
