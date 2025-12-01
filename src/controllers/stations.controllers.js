//train.controller.js
import {
  getAllStations,
  insertStation,
  deleteStationById,
  editStationById
} from "../models/stations.models.js";

export const createStation = async (req, res) => {
  console.log(`${new Date().toISOString()} POST createStation chamado`);
  try {
    const {
      estacao_nome,
      estacao_cidade,
      estacao_bairro,
      estacao_rua,
      estacao_numero,
    } = req.body;

    const id = await insertStation(
      estacao_nome,
      estacao_cidade,
      estacao_bairro,
      estacao_rua,
      estacao_numero
    );

    return res.status(200).json({ message: "Estacao criada com sucesso", id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listStations = async (req, res) => {
  console.log(`${new Date().toISOString()} GET listStations chamado`);
  try {
    const estacoes = await getAllStations();

    return res.status(200).json({ estacoes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const deleteStation = async (req, res) => {
  console.log(`${new Date().toISOString()} DELETE deleteStation chamado`);
  try {
    const { id } = req.params;
    const affectedRows = await deleteStationById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Estacao não encontrada" });
    }

    return res.status(200).json({ message: "Estacao deletada com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const editStation = async (req, res) => {
  console.log(`${new Date().toISOString()} PUT editStation chamado`);
  try {
    const {
      id,
      estacao_nome,
      estacao_cidade,
      estacao_bairro,
      estacao_rua,
      estacao_numero,
    } = req.body;
    if (!id) {
      return res.status(401).json({ error: "Estacao  não encontrada" });
    }
    if (
      !estacao_nome ||
      !estacao_cidade ||
      !estacao_bairro ||
      !estacao_rua ||
      !estacao_numero
    ) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const affectedRows = await editStationById(id, {
      estacao_nome,
      estacao_cidade,
      estacao_bairro,
      estacao_rua,
      estacao_numero,
    });

    if (affectedRows > 0) {
      return res.status(200).json({ message: "Estacao atualizada com sucesso" });
    } else {
      return res.status(404).json({ error: "Estacao não encontrada" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};
