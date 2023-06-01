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
    next(error);
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
        res.cookie("token", accessToken).json({
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
    next(error);
  }
};

const userProfile = (req, res, next) => {
  try {
    jwtHelper
      .verifyAccessToken(req.cookies.token)
      .then((data) => res.json(data));
  } catch (error) {
    next(error);
  }
};
export default { userRegister, userLogin, userProfile };
