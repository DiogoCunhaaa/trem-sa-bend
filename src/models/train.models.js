import db from "../db.js";

export const insertTrain = async (train) => {
  const { modelo_trem, id_user } = train;

  const [result] = await db.query(
    "INSERT INTO trens (modelo_trem, id_usuario) VALUES (?, ?)",
    [modelo_trem, id_user]
  );

  return result.insertId;
};

export const getAllTrains = async () => {
  const [rows] = await db.query("SELECT * FROM trens");
  return rows;
};

export const deleteTrainById = async (id) => {
  const [result] = await db.query("DELETE FROM trens WHERE id_trem = ?", [id]);
  return result.affectedRows;
};