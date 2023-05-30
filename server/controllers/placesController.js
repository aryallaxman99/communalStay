import Place from "../models/PlaceModel.js";

const addPlaces = async (req, res) => {
  try {
    const response = await Place.create(req.body);
    res.json({ response });
  } catch (error) {
    console.log(error);
  }
};

export default { addPlaces };
