import db from "../db.js";

export const insertRoute = async ({ saida_rota, chegada_rota, destino_rota, id_trem }) => {
    const query = `
        INSERT INTO rotas (saida_rota, chegada_rota, destino_rota, id_trem)
        VALUES (?, ?, ?, ?)
    `;
    const values = [saida_rota, chegada_rota, destino_rota, id_trem];
    const [result] = await db.query(query, values);
    return result.insertId;
};

export const getAllRoutes = async () => {
    const query = `
        SELECT r.*, t.nome_trem 
        FROM rotas r
        JOIN trens t ON r.id_trem = t.id_trem
    `;
    const [result] = await db.query(query);
    return result;
};

export const getRouteById = async (id) => {
    const query = `
        SELECT r.*, t.nome_trem 
        FROM rotas r
        JOIN trens t ON r.id_trem = t.id_trem
        WHERE r.id_rota = ?
    `;
    const values = [id];
    const [result] = await db.query(query, values);
    return result[0];
};

export const deleteRoute = async (id) => {
    const query = `
        DELETE FROM rotas WHERE id_rota = ?
    `;
    const values = [id];
    const [result] = await db.query(query, values);
    return result.affectedRows;
};

export const updateRoute = async (id, { saida_rota, chegada_rota, destino_rota, id_trem }) => {
    const query = `
        UPDATE rotas 
        SET saida_rota = ?, chegada_rota = ?, destino_rota = ?, id_trem = ?
        WHERE id_rota = ?
    `;
    const values = [saida_rota, chegada_rota, destino_rota, id_trem, id];
    const [result] = await db.query(query, values);
    return result.affectedRows;
};