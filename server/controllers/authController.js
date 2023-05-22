import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import user from "../models/UserModel.js";

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
        jwt.sign(
          { email: doesEmailExists.email, id: doesEmailExists._id },
          process.env.ACCESS_TOKEN_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
              msg: "loged in",
              userDetails: refactoredData,
              status: true,
              type: "success",
            });
          }
        );
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
export default { userRegister, userLogin };
