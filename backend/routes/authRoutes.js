import express from "express";
import {
  register,
  login,
  protect,
  getMe,
  updateProfile,
  deleteUser,
  resetPassword,
} from "../controllers/authController.js";
import { uploadUserPhoto } from "../utils/upload.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// protected route with token
router.get("/me", protect, getMe);
router.patch("/update-profile", protect, uploadUserPhoto, updateProfile);
router.patch("/delete-account", protect, deleteUser);
router.patch("/reset-password", protect, resetPassword);

export default router;
