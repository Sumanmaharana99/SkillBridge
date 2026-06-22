import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { generateRoadmap, askAI} from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/roadmap",
  protect,
  generateRoadmap
);
router.post(
  "/chat",
  askAI
);

export default router;