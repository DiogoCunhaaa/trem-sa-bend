//sensor.controller.js
import {
  getAllSensors,
  insertSensor,
  deleteSensorById,
  editSensorById
} from "../models/sensor.models.js";

export const createSensor = async (req, res) => {
  try {
    const { tipo_sensor, valor_sensor } = req.body;

    if (!tipo_sensor || !valor_sensor) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const id = await insertSensor({ tipo_sensor, valor_sensor });

    return res.status(200).json({ message: "Sensor criado com sucesso", id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listSensors = async (_req, res) => {
  console.log(`${new Date().toISOString()} GET listSensors chamado`);
  try {
    const sensores = await getAllSensors();
    res.json(sensores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteSensorById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Sensor não encontrado" });
    }

    return res.status(200).json({ message: "Sensor deletado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const editSensor = async (req, res) => {
  console.log(`${new Date().toISOString()} PUT editSensor chamado`);
  try {
    const { id, tipo_sensor, valor_sensor } = req.body;
    if (!id) {
      return res.status(401).json({ error: "Sensor  não encontrado" });
    }
    if (!tipo_sensor || !valor_sensor) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const affectedRows = await editSensorById(id, {
      tipo_sensor,
      valor_sensor,
    });

    if (affectedRows > 0) {
      return res.status(200).json({ message: "Sensor atualizado com sucesso" });
    } else {
      return res.status({ error: "Sensor não encontrado" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};
