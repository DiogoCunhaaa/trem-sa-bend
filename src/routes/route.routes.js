import { Router } from "express";
import {
  createRoute,
  getRoutes,
  getRoute,
  deleteRouteById,
  updateRouteById
} from "../controllers/route.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.post("/create", authMiddleware, createRoute);
router.get("/", authMiddleware, getRoutes);
router.get("/:id", authMiddleware, getRoute);
router.delete("/delete/:id", authMiddleware, deleteRouteById);
router.put("/update/:id", authMiddleware, updateRouteById);

export default router;