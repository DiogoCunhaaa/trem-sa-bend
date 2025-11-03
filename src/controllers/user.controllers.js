//user.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mailer.js";
import {
  insertUser,
  getAllUsers,
  getUserByEmail,
  deleteUserById,
  updateUserPasswordById,
} from "../models/user.models.js";
import {
  validateEmail,
  validatePassword,
  validateCPF,
  cleanCPF,
} from "../middlewares/middlewares.js";

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
    if (!validateCPF(cpf_usuario)) {
      return res.status(400).json({ error: "Cpf inválido" });
    }
    const cpf_limpo = cleanCPF(cpf_usuario);

    const saltRounds = 10;
    const senha_usuario_hash = await bcrypt.hash(senha_usuario, saltRounds);

    const id = await insertUser({
      email_usuario,
      nome_usuario,
      cpf_usuario: cpf_limpo,
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

    const senhaCorreta = await bcrypt.compare(
      senha_usuario,
      user.senha_usuario
    );
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    req.session.user = {
      id: user.id_usuario,
      nome: user.nome_usuario,
      email: user.email_usuario,
    };

    console.log("Sessão criada:", req.session.user);

    return res
      .status(200)
      .json({ message: "Login realizado com sucesso", user: req.session.user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao encerrar sessão" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logout realizado com sucesso" });
  });
};

export const editUser = async (req, res) => {
  try {
    const id = req.session.user?.id;
    if (!id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const { nome_usuario, senha_usuario } = req.body;

    if (!nome_usuario || !senha_usuario) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const saltRounds = 10;
    const senha_usuario_hash = await bcrypt.hash(senha_usuario, saltRounds);

    const affectedRows = await editgUserById(id, {
      nome_usuario,
      senha_usuario: senha_usuario_hash,
    });

    if (affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso" });
    } else {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "Você não tem permissão para editar outros usuários" });
    }

    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email_usuario } = req.body;
    if (!email_usuario) {
      return res.status(400).json({ error: "Informe o email" });
    }
    if (!validateEmail(email_usuario)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    const user = await getUserByEmail(email_usuario);
    // Para evitar enumeração de usuários, sempre retornamos sucesso
    if (!user) {
      return res.status(200).json({ message: "Se existir uma conta, um email foi enviado" });
    }

    const secret = process.env.RESET_SECRET || "reset_secret_dev";
    const token = jwt.sign({ id_usuario: user.id_usuario }, secret, { expiresIn: "15m" });

    const resetInstructions = `Use este token para redefinir sua senha: ${token}\n\nEle expira em 15 minutos.`;
    const html = `<p>Você solicitou redefinição de senha.</p><p>Token (expira em 15 minutos):</p><pre>${token}</pre>`;

    const mailResult = await sendMail({
      to: email_usuario,
      subject: "Redefinição de senha",
      text: resetInstructions,
      html,
    });

    const response = { message: "Email enviado para redefinição de senha" };
    if (mailResult.previewUrl) response.previewUrl = mailResult.previewUrl;
    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, nova_senha } = req.body;
    if (!token || !nova_senha) {
      return res.status(400).json({ error: "Informe token e nova senha" });
    }
    if (!validatePassword(nova_senha)) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const secret = process.env.RESET_SECRET || "reset_secret_dev";
    let payload;
    try {
      payload = jwt.verify(token, secret);
    } catch (e) {
      return res.status(400).json({ error: "Token inválido ou expirado" });
    }

    const saltRounds = 10;
    const senha_usuario_hash = await bcrypt.hash(nova_senha, saltRounds);

    const affected = await updateUserPasswordById(payload.id_usuario, senha_usuario_hash);
    if (affected === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Senha atualizada com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};
