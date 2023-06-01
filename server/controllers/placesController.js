import Place from "../models/PlaceModel.js";
import jwtHelper from "../helpers/jwtHelper.js";

const addPlaces = async (req, res) => {
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

const getPlaces = async (req, res) => {
  try {
    const userInfo = await jwtHelper.verifyAccessToken(req.cookies.token);
    const data = await Place.find({ owner: userInfo.id });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export default { addPlaces, getPlaces };
