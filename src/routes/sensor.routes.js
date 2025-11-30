import { Router } from "express";
import {
  listSensors,
  createSensor,
  deleteSensor,
} from "../controllers/sensor.controllers.js";

const router = Router();

router.get("/", listSensors);
router.post("/create", createSensor);
router.delete("/delete/:id", deleteSensor);

export default router;
