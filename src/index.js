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

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(
  session({
    secret: "Dioguinho12345",
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

const port = 3333;

app.use("/api/users", userRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/maintenance", maintenanceRoutes);

app.listen(port, () => {
  console.log(`Backend running in http://localhost:${port}`);
});

export default app;
