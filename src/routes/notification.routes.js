import { Router } from "express";
import {
  listNotifications,
  createNotification,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", listNotifications);
router.post("/create", authMiddleware, createNotification);
router.delete("/delete/:id", authMiddleware, deleteNotification);

export default router;
