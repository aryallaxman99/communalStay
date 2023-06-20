import express from "express";
import {
  changePassword,
  cookieVerification,
  logout,
  updateProfile,
  userInfo,
  userLogin,
  userRegister,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/verify", cookieVerification);

router.get("/profile", userInfo);

router.put("/profile", updateProfile);

router.put("/changePassword", changePassword);

router.delete("/logout", logout);

export default router;
