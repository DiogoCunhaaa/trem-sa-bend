import Router from "express";
import {
  listUsers,
  createUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/", listUsers);
router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);

export default router;
