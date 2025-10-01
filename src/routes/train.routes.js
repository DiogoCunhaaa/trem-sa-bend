import { Router } from "express";
import {} from "../controllers/train.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", listTrains);


