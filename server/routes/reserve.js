import express from "express";
import { reserve } from "../controllers/reserveController.js";

const router = express.Router();

router.post("/", reserve);

export default router;
