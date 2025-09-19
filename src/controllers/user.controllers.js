//POST
import db from "../db.js";

export const createUser = async (req, res) => {
  try {
    const { email_usuario, nome_usuario, cpf_usuario, cnh_usuario, senha_usuario } = req.body;

    if (!email_usuario || !nome_usuario || !cpf_usuario || !cnh_usuario || !senha_usuario) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const [result] = await db.query(
      "INSERT INTO usuarios (email_usuario, nome_usuario, cpf_usuario, cnh_usuario, senha_usuario) VALUES (? ,? ,?, ?, ?)",
      [email_usuario, nome_usuario, cpf_usuario, cnh_usuario, senha_usuario]
    );

    res
      .status(200)
      .json({ message: "Usuario criado com sucesso", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};

export const listUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};
