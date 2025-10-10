//notification.controller.js
import {
  getAllNotifications,
  insertNotification,
  deleteNotificationById,
} from "../models/notification.models.js";

export const createNotification = async (req, res) => {
  try {
    const { tipo_notificacao, mensagem_notificacao } = req.body;
    const id_user = req.session.user.id;

    if (!tipo_notificacao || !mensagem_notificacao) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const id = await insertNotification({
      tipo_notificacao,
      mensagem_notificacao,
      id_user,
    });

    return res
      .status(200)
      .json({ message: "Notificacao criada com sucesso", id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listNotifications = async (_req, res) => {
  try {
    const notificacoes = await getAllNotifications();
    res.json(notificacoes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteNotificationById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Notificacao não encontrada" });
    }

    return res.status(200).json({ message: "Notifcacao deletada com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};
