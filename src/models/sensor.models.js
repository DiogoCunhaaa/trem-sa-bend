import db from "../db.js";

export const insertSensor = async (sensor) => {
  const { tipo_sensor, valor_sensor } = sensor;

  const [result] = await db.query(
    "INSERT INTO sensores (tipo_sensor, valor_sensor) VALUES (?, ?)",
    [tipo_sensor, valor_sensor]
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