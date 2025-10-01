import db from "../db.js";

export const getAllTrains = async () => {
  const [rows] = await db.query("SELECT * FROM trens");
  return rows;
};
