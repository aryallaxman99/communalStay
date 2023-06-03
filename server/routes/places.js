import express from "express";
import {
  addPlaces,
  getPlaces,
  getPlacesById,
  updatePlace,
} from "../controllers/placesController.js";

const router = express.Router();

router.post("/", addPlaces);

router.get("/all", getPlaces);

router.get("/:id", getPlacesById);

router.put("/update", updatePlace);

export default router;
