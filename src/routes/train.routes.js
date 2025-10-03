import { Router } from "express";
import {
  listTrains,
  createTrain,
  deleteTrain,
  editTrain,
} from "../controllers/train.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", listTrains);
router.post("/create", authMiddleware, createTrain);
router.delete("/delete/:id", authMiddleware, deleteTrain);
router.post("/edit/:id", authMiddleware, editTrain);

export default router;
