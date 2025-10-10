import { Router } from "express";
import {
  listReports,
  createReport,
  deleteReport,
} from "../controllers/report.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", listReports);
router.post("/create", authMiddleware, createReport);
router.delete("/delete/:id", authMiddleware, deleteReport);

export default router;
