import { insertMaintenance, getAllMaintenance, getMaintenanceById, getMaintenanceByTrain, deleteMaintenance, updateMaintenance } from "../models/maintenance.models.js";

export const createMaintenance = async (req, res) => {
    try {
        const { mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario } = req.body;

        if (!mensagem_manutencao || !nome_manutencao || !tipo_manutencao || !id_trem || !id_usuario) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const id = await insertMaintenance({ mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario });

        return res.status(200).json({ message: "Manutenção registrada com sucesso", id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const getMaintenances = async (req, res) => {
    try {
        const maintenances = await getAllMaintenance();
        return res.status(200).json(maintenances);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const getMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const maintenance = await getMaintenanceById(id);
        
        if (!maintenance) {
            return res.status(404).json({ error: "Manutenção não encontrada" });
        }
        
        return res.status(200).json(maintenance);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const getMaintenancesByTrain = async (req, res) => {
    try {
        const { id_trem } = req.params;
        const maintenances = await getMaintenanceByTrain(id_trem);
        
        return res.status(200).json(maintenances);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const deleteMaintenanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await deleteMaintenance(id);

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Manutenção não encontrada" });
        }

        return res.status(200).json({ message: "Manutenção deletada com sucesso" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const updateMaintenanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const { mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario } = req.body;

        if (!mensagem_manutencao || !nome_manutencao || !tipo_manutencao || !id_trem || !id_usuario) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const affectedRows = await updateMaintenance(id, { mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario });

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Manutenção não encontrada" });
        }

        return res.status(200).json({ message: "Manutenção atualizada com sucesso" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};