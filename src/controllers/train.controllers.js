//train.controller.js
import { getAllTrains, insertTrain } from "../models/train.models.js";
import {} from "../middlewares/middlewares.js";

export const createTrain = async (req, res) => {
  try {
    const { modelo_trem } = req.body;

    if (!modelo_trem) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const id = await insertTrain({ modelo_trem });

    return res.status(200).json({ message: "Trem criado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listTrains = async (res) => {
  try {
    const trens = await getAllTrains();
    res.json(trens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
