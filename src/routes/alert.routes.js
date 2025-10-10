import { Router } from "express";
import {
  createAlert,
  getAlerts,
  deleteAlert,
} from "../controllers/alert.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.post("/create", authMiddleware, createAlert);
router.get("/", authMiddleware, getAlerts);
router.delete("/delete/:id", authMiddleware, deleteAlert);

export default router;
