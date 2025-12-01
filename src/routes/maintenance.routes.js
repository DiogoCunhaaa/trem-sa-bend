import { Router } from "express";
import {
  createMaintenance,
  getMaintenances,
  getMaintenance,
  getMaintenancesByTrain,
  deleteMaintenanceById,
  updateMaintenanceById
} from "../controllers/maintenance.controllers.js";

const router = Router();

router.post("/create", createMaintenance);
router.get("/", getMaintenances);
router.get("/train/:id_trem", getMaintenancesByTrain);
router.get("/:id", getMaintenance);
router.delete("/delete/:id", deleteMaintenanceById);
router.put("/update/:id", updateMaintenanceById);

export default router;