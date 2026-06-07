import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getCreditHistory } from "../controllers/creditController.js";
const router = express.Router();

router.get("/history", protect, getCreditHistory);      

export default router;