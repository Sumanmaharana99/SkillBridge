import express from "express";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadAvatar } from "../controllers/uploadController.js";
import cloudinary from "../config/cloudinary.js";
const router = express.Router();

router.post(
  "/avatar",
  protect,
  upload.single("avatar"),
  uploadAvatar
);

export default router;