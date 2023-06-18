import "dotenv/config";
import bcrypt from "bcrypt";
import user from "../models/UserModel.js";
import jwtHelper from "../helpers/jwtHelper.js";

export const userRegister = async (req, res, next) => {
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
    res.json({
      msg: "Something went wrong",
      type: "error",
      status: false,
    });
  }
};

export const userLogin = async (req, res, next) => {
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

export const cookieVerification = async (req, res, next) => {
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

export const updateProfile = async (req, res) => {
  try {
    if (req.cookies.accessToken) {
      const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
      if (id) {
        const response = await user.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (response) {
          const { firstName, profilePicture } = response.toObject();
          res.json({
            userName: { firstName, profilePicture },
            msg: "Profile updated",
            type: "success",
            status: true,
          });
        } else {
          res.json({
            msg: "Something went wrong",
            type: "error",
            status: false,
          });
        }
      } else {
        res.json({
          msg: "Cookies not found",
          type: "error",
          status: false,
        });
      }
    }
  } catch (error) {
    res.json({
      msg: "Something went wrong",
      type: "error",
      status: false,
    });
  }
};

export const userInfo = async (req, res) => {
  try {
    if (req.cookies.accessToken) {
      const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
      const response = await user.findById(id);
      if (response) {
        const { password, _id, ...refactoredData } = response.toObject();
        res.json({ userDetails: refactoredData });
      } else {
        res.json({
          msg: "Something went wrong",
          status: false,
          type: "error",
        });
      }
    } else {
      res.json({
        msg: "Something went wrong 1",
        status: false,
        type: "error",
      });
    }
  } catch (error) {
    res.json({
      msg: "Something went wrong 2",
      status: false,
      type: "error",
    });
  }
};

export const logout = (req, res) => {
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
    res.json({
      msg: "Something went wrong",
      type: "error",
      status: false,
    });
  }
};
