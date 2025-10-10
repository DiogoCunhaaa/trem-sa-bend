//notification.controller.js
import {
  getAllReports,
  insertReport,
  deleteReportById,
} from "../models/report.models.js";

export const createReport = async (req, res) => {
  try {
    const { mensagem_relatorio, nome_relatorio, tipo_relatorio } = req.body;
    const id_user = req.session.user.id;

    if (
      !mensagem_relatorio ||
      !nome_relatorio ||
      !tipo_relatorio
    ) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const id = await insertReport({
      id_relatorio,
      mensagem_relatorio,
      nome_relatorio,
      tipo_relatorio,
      id_user
    });

    return res
      .status(200)
      .json({ message: "Relatorio criado com sucesso", id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listReports = async (_req, res) => {
  try {
    const relatorios = await getAllReports();
    res.json(relatorios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteReportById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Relatorio não encontrado" });
    }

    return res.status(200).json({ message: "Relatorio deletado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};
