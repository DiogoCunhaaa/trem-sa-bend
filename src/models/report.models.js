import db from "../db.js";

export const insertReport = async (relatorio) => {
  const { mensagem_relatorio, nome_relatorio, tipo_relatorio, id_user } = relatorio;

  const [result] = await db.query(
    "INSERT INTO relatorios (mensagem_relatorio, nome_relatorio, tipo_relatorio, fk_id_usuario) VALUES (?, ?, ?, ?)",
    [mensagem_relatorio, nome_relatorio, tipo_relatorio, id_user]
  );

  return result.insertId;
};

export const getAllReports = async () => {
  const [rows] = await db.query("SELECT * FROM relatorios");
  return rows;
};

export const deleteReportById = async (id) => {
  const [result] = await db.query(
    "DELETE FROM relatorios WHERE id_relatorio = ?",
    [id]
  );
  return result.affectedRows;
};
