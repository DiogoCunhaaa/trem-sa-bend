import db from "../db.js";

export const insertAlert = async ({ alert }) => {
    const { id_user, tipo_alerta, mensagem_alerta, horario_alerta, nome_alerta } = alert;
    const query = `
        INSERT INTO alertas (id_user, tipo_alerta, mensagem_alerta, horario_alerta, nome_alerta)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [id_user, tipo_alerta, mensagem_alerta, horario_alerta, nome_alerta];
    const [result] = await db.query(query, values);
    return result.insertId;
};

export const getAllAlerts = async () => {
    const query = `
        SELECT * FROM alertas
    `;
    const [result] = await db.query(query);
    return result;
};

export const DeleteAlert = async (id) => {
    const query = `
        DELETE FROM alertas WHERE id_alerta = ?
    `;
    const values = [id];
    const [result] = await db.query(query, values);
    return result.affectedRows;
};