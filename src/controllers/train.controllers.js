//train.controller.js
import {
  getAllTrains,
  insertTrain,
  deleteTrainById,
} from "../models/train.models.js";
import { getUserByEmail } from "../models/user.models.js";

export const createTrain = async (req, res) => {
  console.log(`${new Date().toISOString()} POST createUser chamado`);
  try {
    const { modelo_trem, email_usuario } = req.body;

    if (!modelo_trem || !email_usuario) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = await getUserByEmail(email_usuario);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado "});
    }
    console.log(user);
    const id = await insertTrain({ modelo_trem, id_user: user.id_usuario });

    console.log("Trem criado:", id);

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
