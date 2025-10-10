import db from "../db.js";

export const insertMaintenance = async ({ mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario }) => {
    const query = `
        INSERT INTO manutencao (mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario];
    const [result] = await db.query(query, values);
    return result.insertId;
};

export const getAllMaintenance = async () => {
    const query = `
        SELECT m.*, t.nome_trem, u.nome_usuario 
        FROM manutencao m
        JOIN trens t ON m.id_trem = t.id_trem
        JOIN usuarios u ON m.id_usuario = u.id_usuario
    `;
    const [result] = await db.query(query);
    return result;
};

export const getMaintenanceById = async (id) => {
    const query = `
        SELECT m.*, t.nome_trem, u.nome_usuario 
        FROM manutencao m
        JOIN trens t ON m.id_trem = t.id_trem
        JOIN usuarios u ON m.id_usuario = u.id_usuario
        WHERE m.id_manutencao = ?
    `;
    const values = [id];
    const [result] = await db.query(query, values);
    return result[0];
};

export const getMaintenanceByTrain = async (id_trem) => {
    const query = `
        SELECT m.*, t.nome_trem, u.nome_usuario 
        FROM manutencao m
        JOIN trens t ON m.id_trem = t.id_trem
        JOIN usuarios u ON m.id_usuario = u.id_usuario
        WHERE m.id_trem = ?
    `;
    const values = [id_trem];
    const [result] = await db.query(query, values);
    return result;
};

export const deleteMaintenance = async (id) => {
    const query = `
        DELETE FROM manutencao WHERE id_manutencao = ?
    `;
    const values = [id];
    const [result] = await db.query(query, values);
    return result.affectedRows;
};

export const updateMaintenance = async (id, { mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario }) => {
    const query = `
        UPDATE manutencao 
        SET mensagem_manutencao = ?, nome_manutencao = ?, tipo_manutencao = ?, id_trem = ?, id_usuario = ?
        WHERE id_manutencao = ?
    `;
    const values = [mensagem_manutencao, nome_manutencao, tipo_manutencao, id_trem, id_usuario, id];
    const [result] = await db.query(query, values);
    return result.affectedRows;
};