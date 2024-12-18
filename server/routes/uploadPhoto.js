import express from "express";
import uploadPhotoController from "../controllers/uploadPhotoController.js";
import { photosMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload-via-link", uploadPhotoController.uploadPhotoViaLink);

router.post("/", photosMiddleware.any(), uploadPhotoController.uploadPhoto);

export default router;
