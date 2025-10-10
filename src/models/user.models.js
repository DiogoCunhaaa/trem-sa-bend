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

export const editUserById = async (id, { nome_usuario, senha_usuario }) => {
  const [result] = await db.query(
    "UPDATE users SET user_name = ?, user_password = ? WHERE id_users = ?",
    [nome_usuario, senha_usuario, id]
  );
  return result.affectedRows;
};
