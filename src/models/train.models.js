import db from "../db.js";

export const insertTrain = async (train) => {
  const { modelo_trem } = train;

  const [result] = await db.query(
    "INSERT INTO trens (modelo_trem) VALUES (?)",
    [modelo_trem]
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
