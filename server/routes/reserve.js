import express from "express";
import {
  cancelReservation,
  getAllReservations,
  reserve,
} from "../controllers/reserveController.js";

const router = express.Router();

router.post("/", reserve);

router.get("/", getAllReservations);

router.delete("/", cancelReservation);

export default router;
