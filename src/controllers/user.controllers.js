//user.controller.js
import bcrypt from "bcrypt";
import { forgotPassEmail } from "../utils/mail.js";
import {
  insertUser,
  getAllUsers,
  getUserByEmail,
  deleteUserById,
  updatePasswordByEmail,
} from "../models/user.models.js";
import {
  validateEmail,
  validatePassword,
  validateCPF,
  cleanCPF,
  generateRandomPassword,
} from "../middlewares/middlewares.js";

export const createUser = async (req, res) => {
  console.log(`${new Date().toISOString()} POST createUser chamado`);
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

    const user = await getUserByEmail(email_usuario);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    req.session.user = {
      id: user.id_usuario,
      nome: user.nome_usuario,
      email: user.email_usuario,
    };

    console.log("Sessão criada:", req.session);

    res.status(200).json({
      message: "Usuário criado com sucesso",
      id,
      user: req.session.user,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email/CPF/CNH já existentes" });
    }

    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const forgotPassword = async (req, res) => {
  console.log(`${new Date().toISOString()} POST forgotPassword chamado`);
  try {
    const { email_usuario } = req.body;

    if (!email_usuario) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }

    if (!validateEmail(email_usuario)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    const user = await getUserByEmail(email_usuario);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const novaSenha = generateRandomPassword();

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(novaSenha, saltRounds);

    const affectedRows = await updatePasswordByEmail(email_usuario, senhaHash);

    if (affectedRows === 0) {
      return res.status(500).json({ error: "Erro ao atualizar senha" });
    }

    try {
      await forgotPassEmail(email_usuario, user.nome_usuario, novaSenha);
    } catch (err) {
      console.error("Erro ao enviar email:", err);
      // Mesmo que o email falhe, a senha foi alterada, então retornamos sucesso
    }

    return res.status(200).json({
      message: "Nova senha enviada para seu email com sucesso!",
      emailSent: true,
    });
  } catch (err) {
    console.error("Erro em forgotPassword:", err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listUsers = async (req, res) => {
  console.log(`${new Date().toISOString()} GET listUsers chamado`);
  try {
    const usuarios = await getAllUsers();
    console.log(`${usuarios.length} usuários retornados`);
    // usuarios.forEach(u => delete u.senha_usuario);
    res.json(usuarios);
  } catch (err) {
    console.error("Erro em listUsers:", err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const deleteUser = async (req, res) => {
  console.log(`${new Date().toISOString()} DELETE deleteUser chamado`);
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
  console.log(`${new Date().toISOString()} POST loginUser chamado`);
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

    console.log("Sessão criada:", req.session);

    return res
      .status(200)
      .json({ message: "Login realizado com sucesso", user: req.session.user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const logoutUser = async (req, res) => {
  console.log(`${new Date().toISOString()} POST logoutUser chamado`);
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
  console.log(`${new Date().toISOString()} PUT editUser chamado`);
  try {
    const id = req.session.user?.id;
    if (!id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const { nome_usuario, email_usuario, senha_usuario } = req.body;

    if (!nome_usuario || !senha_usuario || !email_usuario) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const saltRounds = 10;
    const senha_usuario_hash = await bcrypt.hash(senha_usuario, saltRounds);

    const affectedRows = await editUserById(id, {
      nome_usuario,
      email_usuario,
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
