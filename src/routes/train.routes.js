import { Router } from "express";
import {
  listTrains,
  createTrain,
  deleteTrain,
} from "../controllers/train.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", listTrains);
router.post("/create", createTrain);
router.delete("/delete/:id", authMiddleware, deleteTrain);

export default router;
