import { Router } from "express";
import {
  listSensors,
  createSensor,
  deleteSensor,
} from "../controllers/sensor.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", listSensors);
router.post("/create", authMiddleware, createSensor);
router.delete("/delete/:id", authMiddleware, deleteSensor);

export default router;
