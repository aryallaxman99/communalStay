import express from "express";
import {
  addPlaces,
  getAllPlaces,
  getPlacesById,
  getPlacesByOwnerId,
  placesByUserReq,
  searchPlaces,
  updatePlace,
} from "../controllers/placesController.js";

const router = express.Router();

router.post("/", addPlaces);

router.get("/all", getAllPlaces);

router.get("/", placesByUserReq);

router.get("/search", searchPlaces);

router.get("/owner-places", getPlacesByOwnerId);

router.get("/:id", getPlacesById);

router.put("/update", updatePlace);

export default router;
