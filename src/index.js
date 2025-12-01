import dotenv from "dotenv";
dotenv.config();

import "./utils/mqtt/subscriber.js";

import express from "express";
import session from "express-session";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import trainRoutes from "./routes/train.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import sensorRoutes from "./routes/sensor.routes.js";
import notificationsRoutes from "./routes/notification.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import routeRoutes from "./routes/route.routes.js"; 

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/users", userRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/routes", routeRoutes); // <-- ADICIONADO

app.listen(process.env.PORT, () => {
  console.log(`Backend running in http://localhost:${process.env.PORT}`);
});

export default app;
