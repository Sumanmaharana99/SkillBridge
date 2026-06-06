import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import {updateProfile,getUserProfile,searchUsers} from '../controllers/userController.js';
const router = express.Router();

router.put("/profile",protect,updateProfile);
router.get("/profile/:id", getUserProfile);
router.get("/search", searchUsers);

export default router;