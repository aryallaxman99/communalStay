import express from "express";
import places from "../controllers/placesController.js";

const router = express.Router();

router.post("/", places.addPlaces);

export default router;
