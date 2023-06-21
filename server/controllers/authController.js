import "dotenv/config";
import bcrypt from "bcrypt";
import user from "../models/UserModel.js";
import jwtHelper from "../helpers/jwtHelper.js";
import {
  ConflictError,
  ForbiddenError,
  HttpError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/errorHandling.js";

export const userRegister = async (req, res, next) => {
  try {
    const data = await req.body.values;
    const doesEmailExists = await user.findOne({
      email: data.email,
    });
    if (doesEmailExists) throw new ConflictError("Email already exists");

    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    const response = await user.create(data);
    if (!response) throw new HttpError("Something went wrong", 500);
    res.json({ msg: "User registered", response: true, type: "success" });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ msg: error.message, type: "error", status: false });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const data = await req.body.values;
    const doesEmailExists = await user.findOne({
      email: data.email,
    });
    if (!doesEmailExists) throw new ForbiddenError("Invalid Email or Password");

    const isValidPassword = bcrypt.compareSync(
      data.password,
      doesEmailExists.password
    );

    const { password, __v, ...refactoredData } = doesEmailExists.toObject();
    if (!isValidPassword)
      throw new UnauthorizedError("Invalid Email or Password");
    const accessToken = await jwtHelper.signAccessToken(
      doesEmailExists.email,
      doesEmailExists.id
    );
    const refreshToken = await jwtHelper.signRefreshToken(
      doesEmailExists.email,
      doesEmailExists.id
    );

    res
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken, {
        expires: new Date(Number(new Date()) + 31556926000),
        httpOnly: false,
      })
      .json({
        msg: "loged in",
        userDetails: refactoredData,
        status: true,
        type: "success",
      });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ msg: error.message, type: "error", status: false });
  }
};

export const cookieVerification = async (req, res, next) => {
  try {
    if (!req.cookies.refreshToken) throw new NotFoundError("Cookies not found");
    const response = await jwtHelper.verifyRefreshToken(
      req.cookies.refreshToken
    );
    const accessToken = await jwtHelper.signAccessToken(
      response.email,
      response.id
    );
    res.cookie("accessToken", accessToken).json({
      userData: response,
      msg: "Success",
      status: true,
    });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ msg: error.message, type: "error", status: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.cookies.accessToken) throw new NotFoundError("Cookies not found");
    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    if (!id) throw new ForbiddenError("Something went wrong");
    const response = await user.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!response) throw new HttpError("Somethingn went wrong", 500);
    const { firstName, profilePicture } = response.toObject();
    res.json({
      userName: { firstName, profilePicture },
      msg: "Profile updated",
      type: "success",
      status: true,
    });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ msg: error.message, type: "error", status: false });
  }
};

export const changePassword = async (req, res) => {
  try {
    if (!req.cookies.accessToken) throw new NotFoundError("Cookies not found");

    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    if (!id) throw new ForbiddenError("Something went wrong");

    const userDetails = await user.findById(id);
    if (!userDetails) throw new NotFoundError("Something went wrong");

    const { currentPassword, newPassword } = req.body;
    const isValidPassword = bcrypt.compareSync(
      currentPassword,
      userDetails.password
    );
    if (!isValidPassword)
      throw new ConflictError("Current password not matched");

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(newPassword, salt);
    const response = await user.findByIdAndUpdate(
      id,
      {
        password,
      },
      { new: true }
    );
    if (!response) throw new HttpError("Something went wrong", 500);

    res.json({
      msg: "Password updated",
      type: "success",
      status: true,
    });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ msg: error.message, type: "error", status: false });
  }
};

export const userInfo = async (req, res) => {
  try {
    if (!req.cookies.accessToken) throw new NotFoundError("Cookies not found");
    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    const response = await user.findById(id);
    if (!response) throw new HttpError("Something went wrong", 500);
    const { password, _id, ...refactoredData } = response.toObject();
    res.json({ userDetails: refactoredData });
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message,
      status: false,
      type: "error",
    });
  }
};

export const logout = (req, res) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken)
      throw new ForbiddenError("Something went wrong");
    res.cookie("accessToken", "").cookie("refreshToken", "").json({
      msg: "User logged out",
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
