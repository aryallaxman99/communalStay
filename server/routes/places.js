import express from "express";
import places from "../controllers/placesController.js";

const router = express.Router();

router.post("/", places.addPlaces);
router.get("/all", places.getPlaces);
router.get("/:id", places.getPlacesById);

export default router;
