import express from "express"

import protect from "../middlewares/authMiddleware.js"

import {createReview,getMentorReviews} from "../controllers/reviewController.js"

const router = express.Router();
router.post("/",protect,createReview);
router.get("/:mentorId",getMentorReviews);

export default router;