import jwtHelper from "../helpers/jwtHelper.js";
import user from "../models/UserModel.js";
import Reserve from "../models/ReserveModel.js";

export const reserve = async (req, res) => {
  try {
    const data = await req.body;
    const { id } = await jwtHelper.verifyAccessToken(req.cookies.accessToken);
    const { email, phoneNumber } = await user.findById(id);
    data.userid = id;
    data.email = email;
    data.phoneNumber = phoneNumber;

    const response = await Reserve.create(data);
    if (response) {
      res.json({
        msg: "Reserved!!!",
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
    console.error(error);
  }
};
