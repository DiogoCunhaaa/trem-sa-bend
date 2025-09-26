//user.controller.js
import bcrypt from "bcrypt";
import {
  insertUser,
  getAllUsers,
  getUserByEmail,
  deleteUserById,
  validateEmail,
  validatePassword,
} from "../models/user.models.js";

export const createUser = async (req, res) => {
  try {
    const {
      email_usuario,
      nome_usuario,
      cpf_usuario,
      cnh_usuario,
      senha_usuario,
    } = req.body;

    if (
      !email_usuario ||
      !nome_usuario ||
      !cpf_usuario ||
      !cnh_usuario ||
      !senha_usuario
    ) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    if (!validateEmail(email_usuario)) {
      return res.status(400).json({ error: "Email inválido" });
    }
    if (!validatePassword(senha_usuario)) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const saltRounds = 10;
    const senha_usuario_hash = await bcrypt.hash(senha_usuario, saltRounds);

    const id = await insertUser({
      email_usuario,
      nome_usuario,
      cpf_usuario,
      cnh_usuario,
      senha_usuario_hash,
    });

    res.status(200).json({ message: "Usuário criado com sucesso", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const usuarios = await getAllUsers();
    // usuarios.forEach(u => delete u.senha_usuario);
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteUserById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email_usuario, senha_usuario } = req.body;

    if (!email_usuario || !senha_usuario) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = await getUserByEmail(email_usuario);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha_usuario, user.senha_usuario);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    return res.status(200).json({ message: "Login realizado com sucesso" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};
