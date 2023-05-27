import express from "express";
import photoDownload from "../controllers/photoDownloaderController.js";

const router = express.Router();

router.post("/download", photoDownload);

export default router;
