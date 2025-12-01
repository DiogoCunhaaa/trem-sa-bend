// src/routes/route.routes.js
import express from "express";
import {
    createRoute,
    getRoutes,
    getRoute,
    deleteRouteById,
    updateRouteById
} from "../controllers/route.controllers.js";

const router = express.Router();

// ROTAS
router.get("/", getRoutes);                    // GET /api/routes
router.get("/:id", getRoute);                  // GET /api/routes/:id
router.post("/create", createRoute);           // POST /api/routes/create
router.put("/update/:id", updateRouteById);    // PUT /api/routes/update/:id
router.delete("/delete/:id", deleteRouteById); // DELETE /api/routes/delete/:id

export default router;