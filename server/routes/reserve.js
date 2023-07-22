import express from "express";
import {
  cancelReservation,
  getAllReservations,
  getAllReservationsRequests,
  reserve,
} from "../controllers/reserveController.js";

const router = express.Router();

router.post("/", reserve);

router.get("/", getAllReservations);

router.get("/booking", getAllReservationsRequests);

router.delete("/", cancelReservation);

export default router;
