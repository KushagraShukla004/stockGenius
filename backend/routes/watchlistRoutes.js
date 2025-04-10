import express from "express";
import { protect } from "../controllers/authController.js";
import { getWatchlist, toggleWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();

router.use(protect);

router.get("/", getWatchlist);
router.post("/toggle", toggleWatchlist);

export default router;
