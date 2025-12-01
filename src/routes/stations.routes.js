import { Router } from "express";
import {
  listStations,
  createStation,
  deleteStation,
  editStation
} from "../controllers/stations.controllers.js";

const router = Router();

router.get("/", listStations);
router.post("/create", createStation);
router.delete("/delete/:id", deleteStation);
router.put("/edit", editStation);

export default router;
