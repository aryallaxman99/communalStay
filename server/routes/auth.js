import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

router.post("/register", authController.userRegister);

router.post("/login", authController.userLogin);

router.get("/profile", authController.userProfile);

export default router;
