import { Router } from "express";
import {
  createMaintenance,
  getMaintenances,
  getMaintenance,
  getMaintenancesByTrain,
  deleteMaintenanceById,
  updateMaintenanceById
} from "../controllers/maintenance.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.post("/create", authMiddleware, createMaintenance);
router.get("/", authMiddleware, getMaintenances);
router.get("/:id", authMiddleware, getMaintenance);
router.get("/train/:id_trem", authMiddleware, getMaintenancesByTrain);
router.delete("/delete/:id", authMiddleware, deleteMaintenanceById);
router.put("/update/:id", authMiddleware, updateMaintenanceById);

export default router;