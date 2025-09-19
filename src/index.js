import express from "express";
import db from "./db.js";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

const port = 3333;

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Backend running in http://localhost:${port}`);
});

export default app;
