import { Router } from "express";
import {
  listSensors,
  createSensor,
  deleteSensor,
  editSensor
} from "../controllers/sensor.controllers.js";

const router = Router();

router.get("/", listSensors);
router.post("/create", createSensor);
router.delete("/delete/:id", deleteSensor);
router.put("/edit", editSensor);

export default router;
