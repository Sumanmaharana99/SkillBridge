import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  bookSession,
  getMySessions,
  updateSessionStatus,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/book",protect,bookSession);

router.get("/my-sessions",protect,
  getMySessions
);

router.patch("/:id/status",protect,
  updateSessionStatus
);

export default router;