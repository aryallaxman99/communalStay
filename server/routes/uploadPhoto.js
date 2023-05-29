import express from "express";
import uploadPhotoController from "../controllers/uploadPhotoController.js";

const router = express.Router();

router.post("/upload-via-link", uploadPhotoController.uploadPhotoViaLink);

router.post("/", uploadPhotoController.uploadPhoto);

export default router;
