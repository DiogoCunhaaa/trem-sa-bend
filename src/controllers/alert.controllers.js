import { insertAlert, getAllAlerts, DeleteAlert } from "../models/alert.models.js";

export const createAlert = async (req, res) => {
    try {
        const { tipo_alerta, mensagem_alerta, horario_alerta, nome_alerta } = req.body;
        const id_user = req.session.user.id;

        if (!tipo_alerta || !mensagem_alerta || !horario_alerta || !nome_alerta) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const id = await insertAlert({ id_user, tipo_alerta, mensagem_alerta, horario_alerta, nome_alerta });
        
        if (!id) {
            return res.status(500).json({ error: "Falha ao inserir alerta no banco de dados" });
        }

        return res.status(201).json({ 
            message: "Alerta criado com sucesso",
            id: id
        });
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