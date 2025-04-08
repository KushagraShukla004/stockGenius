import express from "express";
import { register, login, protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected route example
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
