import "dotenv/config";
import bcrypt from "bcrypt";
import user from "../models/UserModel.js";
import jwtHelper from "../helpers/jwtHelper.js";

const userRegister = async (req, res, next) => {
  try {
    const data = await req.body.values;
    const doesEmailExists = await user.findOne({
      email: data.email,
    });
    if (!doesEmailExists) {
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);

      const response = await user.create(data);
      if (response) {
        res.json({ msg: "user registered", response: true, type: "success" });
      } else {
        res.json({
          msg: "something went wrong",
          response: false,
          type: "warning",
        });
      }
    } else {
      res.json({ msg: "email already exists", response: false, type: "error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const data = await req.body.values;
    const doesEmailExists = await user.findOne({
      email: data.email,
    });
    if (doesEmailExists) {
      const isValidPassword = bcrypt.compareSync(
        data.password,
        doesEmailExists.password
      );

      const { password, __v, ...refactoredData } = doesEmailExists.toObject();
      if (isValidPassword) {
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
      } else {
        res.json({
          msg: "Invalid email or password",
          status: false,
          type: "error",
        });
      }
    } else {
      res.json({
        msg: "Invalid email or password",
        status: false,
        type: "error",
      });
    }
  } catch (error) {
    res.json({
      msg: "Internal Server Error",
      status: false,
      type: "error",
    });
  }
};

const userProfile = async (req, res, next) => {
  try {
    if (req.cookies.refreshToken) {
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
    } else {
      res.json({
        msg: "Cookies not found",
        type: "error",
        status: false,
      });
    }
  } catch (error) {
    res.json({
      msg: "Cookies not valid",
      type: "error",
      status: false,
    });
  }
};

const logout = (req, res) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (accessToken && refreshToken) {
      res.cookie("accessToken", "").cookie("refreshToken", "").json({
        msg: "User logged out",
        type: "success",
        status: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export default { userRegister, userLogin, userProfile, logout };
