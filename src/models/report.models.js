import db from "../db.js";

export const insertReport = async (relatorio) => {
  const { mensagem_relatorio, nome_relatorio, tipo_relatorio, id_user } = relatorio;

  const [result] = await db.query(
    "INSERT INTO relatorios (mensagem_relatorio, nome_relatorio, tipo_relatorio, id_usuario) VALUES (?, ?, ?, ?)",
    [mensagem_relatorio, nome_relatorio, tipo_relatorio, id_user]
  );

  return result.insertId;
};

export const getAllReports = async () => {
  const query = `
    SELECT 
      r.*,
      u.nome_usuario,
      u.email_usuario
    FROM relatorios r
    LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
    ORDER BY r.id_relatorio DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

export const getReportById = async (id) => {
  const query = `
    SELECT 
      r.*,
      u.nome_usuario,
      u.email_usuario
    FROM relatorios r
    LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
    WHERE r.id_relatorio = ?
  `;
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

export const deleteReportById = async (id) => {
  const [result] = await db.query(
    "DELETE FROM relatorios WHERE id_relatorio = ?",
    [id]
  );
  return result.affectedRows;
};

export const updateReportById = async (id, { mensagem_relatorio, nome_relatorio, tipo_relatorio }) => {
  const [result] = await db.query(
    "UPDATE relatorios SET mensagem_relatorio = ?, nome_relatorio = ?, tipo_relatorio = ? WHERE id_relatorio = ?",
    [mensagem_relatorio, nome_relatorio, tipo_relatorio, id]
  );
  return result.affectedRows;
};