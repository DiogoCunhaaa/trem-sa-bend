import db from "./db.js";

export const insertAlert = async ({ tipo_alerta, mensagem_alerta, horario_alerta, tilulo_alerta }) => {
    const query = `
        INSERT INTO alertas (tipo_alerta, mensagem_alerta, horario_alerta, tilulo_alerta)
        VALUES (?, ?, ?, ?)
    `;
    const values = [tipo_alerta, mensagem_alerta, horario_alerta, tilulo_alerta];
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