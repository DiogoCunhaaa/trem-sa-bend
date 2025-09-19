import Router from "express";
import { listUsers, createUser } from "../controllers/user.controllers.js";

const router = Router();

router.get("/", listUsers);
router.post("/create", createUser);

export default router;
