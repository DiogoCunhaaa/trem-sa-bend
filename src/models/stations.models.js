import db from "../db.js";

export const insertStation = async (
  estacao_nome,
  estacao_cidade,
  estacao_bairro,
  estacao_rua,
  estacao_numero
) => {
  const [result] = await db.query(
    "INSERT INTO estacoes (nome_estacao, cidade_estacao, bairro_estacao, rua_estacao, numero_estacao) VALUES (?, ?, ?, ?, ?)",
    [estacao_nome, estacao_cidade, estacao_bairro, estacao_rua, estacao_numero]
  );

  return result.insertId;
};

export const getAllStations = async () => {
  const [rows] = await db.query("SELECT * FROM estacoes");
  return rows;
};

export const deleteStationById = async (id) => {
  const [result] = await db.query("DELETE FROM estacoes WHERE id_estacao = ?", [
    id,
  ]);
  return result.affectedRows;
};

export const editStationById = async (
  id,
  { estacao_nome, estacao_cidade, estacao_bairro, estacao_rua, estacao_numero }
) => {
  const [result] = await db.query(
    "UPDATE estacoes SET nome_estacao = ?, cidade_estacao = ?, bairro_estacao = ?, rua_estacao = ?, numero_estacao = ? WHERE id_estacao = ?",
    [
      estacao_nome,
      estacao_cidade,
      estacao_bairro,
      estacao_rua,
      estacao_numero,
      id,
    ]
  );
  return result.affectedRows;
};
