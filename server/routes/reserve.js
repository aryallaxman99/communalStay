import express from "express";
import {
  getAllReservations,
  reserve,
} from "../controllers/reserveController.js";

const router = express.Router();

router.post("/", reserve);

router.get("/", getAllReservations);

export default router;
