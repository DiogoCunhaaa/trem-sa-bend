import express from "express";
import session from "express-session";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import trainRoutes from "./routes/train.routes.js";
import alertRoutes from "./routes/alert.routes.js";

const app = express();

app.use(
  session({
    secret: "Dioguinho12345",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
  })
);

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

const port = 3333;

app.use("/api/users", userRoutes);
app.use("api/train", trainRoutes);
app.use("api/alertas", alertRoutes);

app.listen(port, () => {
  console.log(`Backend running in http://localhost:${port}`);
});

export default app;
