import express from "express";
import session from "express-session";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  session({
    secret: "Dioguinho12345",
    resave: false,
    saveUnitialized: false,
  })
);

app.use(express.json());
app.use(cors());

app.get("/views", (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.send(`voce visitou ${req.session.views}`);
});

const port = 3333;

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Backend running in http://localhost:${port}`);
});

export default app;
