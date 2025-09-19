import express from "express";
import db from "./db.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

const port = 3333;

app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/criar", async (req, res) => {
  try {
    const { email_usuario, nome_usuario, cpf_usuario, cnh_usuario } = req.body;

    if (!email_usuario || !nome_usuario || !cpf_usuario || !cnh_usuario) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const [result] = await db.query(
      "INSERT INTO usuarios (email_usuario, nome_usuario, cpf_usuario, cnh_usuario) VALUES (? ,? ,?, ?)",
      [email_usuario, nome_usuario, cpf_usuario, cnh_usuario]
    );

    res.status(200).json({ message: "Usuario criado com sucesso", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

app.listen(port, () => {
  console.log(`Backend running in http://localhost:${port}`);
});

export default app;
