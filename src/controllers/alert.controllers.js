import { insertAlert, getAllAlerts, DeleteAlert } from "../models/alert.models.js";

export const createAlert = async (req, res) => {
    try {
        const { tipo_alerta, mensagem_alerta, horario_alerta, tilulo_alerta } = req.body;

        if (!tipo_alerta || !mensagem_alerta || !horario_alerta || !tilulo_alerta) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const id = await insertAlert({ tipo_alerta, mensagem_alerta, horario_alerta, tilulo_alerta });

        return res.status(200).json({ message: "Alerta criado com sucesso" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const getAlerts = async (req, res) => {
    try {
        const alerts = await getAllAlerts();
        return res.status(200).json(alerts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const deleteAlert = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await DeleteAlert(id);

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Alerta não encontrado " });
        }

        return res.status(200).json({ message: "Alerta deletado com sucesso" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor " });
    }
};