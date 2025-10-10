import db from "../db.js";

export const insertSensor = async (sensor) => {
  const { tipo_sensor, valor_sensor, id_trem } = sensor;

  const [result] = await db.query(
    "INSERT INTO sensores (tipo_sensor, valor_sensor, id_trem) VALUES (?, ?, ?)",
    [tipo_sensor, valor_sensor, id_trem]
  );

  return result.insertId;
};

export const getAllSensors = async () => {
  const [rows] = await db.query("SELECT * FROM sensores");
  return rows;
};

export const deleteSensorById = async (id) => {
  const [result] = await db.query("DELETE FROM sensores WHERE id_sensor = ?", [
    id,
  ]);
  return result.affectedRows;
};