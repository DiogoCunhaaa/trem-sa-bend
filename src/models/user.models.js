import db from "../db.js";

export const insertUser = async (user) => {
  const {
    email_usuario,
    nome_usuario,
    cpf_usuario,
    cnh_usuario,
    senha_usuario_hash,
  } = user;

  const [result] = await db.query(
    "INSERT INTO usuarios (email_usuario, nome_usuario, cpf_usuario, cnh_usuario, senha_usuario) VALUES (?, ?, ?, ?, ?)",
    [email_usuario, nome_usuario, cpf_usuario, cnh_usuario, senha_usuario_hash]
  );

  return result.insertId;
};

export const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM usuarios");
  return rows;
};

export const getUserByEmail = async (email_usuario) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE email_usuario = ?",
    [email_usuario]
  );
  return rows[0];
};

export const deleteUserById = async (id) => {
  const [result] = await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [
    id,
  ]);
  return result.affectedRows;
};

export function validateEmail(email_usuario) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email_usuario);
}

export function validatePassword(senha_usuario) {
  if (senha_usuario.length < 8) {
    return false;
  }
  return true;
}
