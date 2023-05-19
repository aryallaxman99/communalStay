import bcrypt from "bcrypt";

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
        res.json({ msg: "user registered" });
      } else {
        res.json({ msg: "something went wrong" });
      }
    } else {
      res.json({ msg: "email already exists" });
    }
  } catch (error) {
    next(error);
  }
};

export default { userRegister };
