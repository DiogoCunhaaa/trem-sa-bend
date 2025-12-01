import { Router } from "express";
import {
  createReport,
  listReports,
  deleteReport,
  generateReport,
  getReport
} from "../controllers/report.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();


router.get("/", listReports);
router.get("/:id", getReport);
router.post("/create", createReport);
router.post("/generate", generateReport);
router.delete("/delete/:id", deleteReport);

export default router;