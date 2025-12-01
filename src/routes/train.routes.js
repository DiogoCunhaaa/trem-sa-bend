import { Router } from "express";
import {
  listTrains,
  createTrain,
  deleteTrain,
} from "../controllers/train.controllers.js";

const router = Router();

router.get("/", listTrains);
router.post("/create", createTrain);
router.delete("/delete/:id", deleteTrain);

export default router;
