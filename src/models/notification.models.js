import db from "../db.js";

export const insertNotification = async (notificacao) => {
  const { tipo_notificacao, mensagem_notificacao, id_user } = notificacao;

  const [result] = await db.query(
    "INSERT INTO notificacoes (tipo_notificacao, mensagem_notificacao, fk_id_usuario) VALUES (?, ?, ?)",
    [tipo_sensor, valor_sensor, id_trem]
  );

  return result.insertId;
};

export const getAllNotifications = async () => {
  const [rows] = await db.query("SELECT * FROM notificacoes");
  return rows;
};

export const deleteNotificationById = async (id) => {
  const [result] = await db.query(
    "DELETE FROM notificacoes WHERE id_notificacao = ?",
    [id]
  );
  return result.affectedRows;
};
