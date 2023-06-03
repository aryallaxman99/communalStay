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
        jwtHelper
          .signAccessToken(doesEmailExists.email, doesEmailExists.id)
          .then((token) => {
            res.cookie("token", token).json({
              msg: "loged in",
              userDetails: refactoredData,
              status: true,
              type: "success",
            });
          })
          .catch((error) => {
            res.json({
              msg: "Internal Server Error",
              status: false,
              type: "error",
            });
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
    console.log(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      const response = await jwtHelper.verifyAccessToken(req.cookies.token);
      res.json({
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
export default { userRegister, userLogin, userProfile };
