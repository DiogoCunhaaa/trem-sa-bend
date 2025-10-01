//train.controller.js
import { getAllTrains } from "../models/train.models.js";
import {} from "../middlewares/middlewares.js";

export const listTrains = async (req, res) => {
  try {
    const trens = await getAllTrains();
    res.json(trens);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};
