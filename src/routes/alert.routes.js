import { Router } from "express";
import {
  createAlert,
  getAlerts,
  deleteAlert,
} from "../controllers/alert.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.post("/alert", authMiddleware, createAlert);
router.get("/alert", authMiddleware, getAlerts);
router.delete("/alert/:id", authMiddleware, deleteAlert);

export default router;
