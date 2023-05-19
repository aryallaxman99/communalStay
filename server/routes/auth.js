import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

router.post("/register", authController.userRegister);

export default router;
