import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { generateRoadmap } from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/roadmap",
  protect,
  generateRoadmap
);

export default router;