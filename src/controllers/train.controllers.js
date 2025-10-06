//train.controller.js
import {
  getAllTrains,
  insertTrain,
  deleteTrainById,
  editTrainById,
} from "../models/train.models.js";

export const createTrain = async (req, res) => {
  try {
    const { modelo_trem } = req.body;
    const id_user = req.session.user.id;

    if (!modelo_trem) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const id = await insertTrain({ modelo_trem, id_user });

    return res.status(200).json({ message: "Trem criado com sucesso", id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listTrains = async (req, res) => {
  try {
    const trens = await getAllTrains();
    res.json(trens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const deleteTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteTrainById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Trem não encontrado" });
    }

    return res.status(200).json({ message: "Trem deletado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const editTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const { modelo_trem } = req.body;
    const affectedRows = await editTrainById({ modelo_trem });

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Trem não encontrado" });
    }

    return res.status(200).json({ message: "Trem editado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};
