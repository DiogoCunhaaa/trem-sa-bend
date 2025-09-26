import Router from "express";
import {
  listUsers,
  createUser,
  deleteUser,
  loginUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/", listUsers);
router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);
router.post("/login", loginUser);

export default router;
