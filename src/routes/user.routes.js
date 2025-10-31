import Router from "express";
import {
  listUsers,
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  editUser,
  infoUser
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", listUsers);
router.post("/create", createUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.put("/edit", authMiddleware, editUser);
router.get("/information/:id", infoUser);

export default router;
