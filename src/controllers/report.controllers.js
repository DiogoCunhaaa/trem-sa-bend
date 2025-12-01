import { 
  insertReport, 
  getAllReports, 
  deleteReportById,
  getReportById
} from "../models/report.models.js";
import db from "../db.js";

export const createReport = async (req, res) => {
  try {
    const { mensagem_relatorio, nome_relatorio, tipo_relatorio, id_user } = req.body;

    if (!nome_relatorio || !tipo_relatorio || !id_user) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
    }

    const id = await insertReport({ 
      mensagem_relatorio, 
      nome_relatorio, 
      tipo_relatorio, 
      id_user 
    });

    return res.status(200).json({ 
      message: "Relatório criado com sucesso", 
      id 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listReports = async (req, res) => {
  try {
    const reports = await getAllReports();
    return res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteReportById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Relatório não encontrado" });
    }

    return res.status(200).json({ message: "Relatório deletado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

export const generateReport = async (req, res) => {
  try {
    const { tipo, filtros, id_usuario } = req.body;

    if (!tipo || !id_usuario) {
      return res.status(400).json({ error: "Tipo e usuário são obrigatórios" });
    }

    const { dataInicio, dataFim, tremId, rotaId, sensorId } = filtros || {};

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ error: "Período é obrigatório" });
    }

    let dadosRelatorio = {};
    let nomeRelatorio = '';

    // Gerar relatório baseado no tipo
    switch (tipo) {
      case 'sensores':
        dadosRelatorio = await gerarRelatorioSensores(dataInicio, dataFim, tremId, sensorId);
        nomeRelatorio = `Relatório de Sensores - ${dataInicio} a ${dataFim}`;
        break;
      
      case 'rotas':
        dadosRelatorio = await gerarRelatorioRotas(dataInicio, dataFim, tremId, rotaId);
        nomeRelatorio = `Relatório de Rotas - ${dataInicio} a ${dataFim}`;
        break;
      
      case 'manutencao':
        dadosRelatorio = await gerarRelatorioManutencao(dataInicio, dataFim, tremId);
        nomeRelatorio = `Relatório de Manutenção - ${dataInicio} a ${dataFim}`;
        break;
      
      default:
        return res.status(400).json({ error: "Tipo de relatório inválido" });
    }

    // Salvar relatório no banco
    const mensagem = JSON.stringify({
      tipo,
      filtros,
      dados: dadosRelatorio,
      data_geracao: new Date().toISOString()
    });

    const id = await insertReport({
      mensagem_relatorio: mensagem,
      nome_relatorio: nomeRelatorio,
      tipo_relatorio: tipo,
      id_user: id_usuario
    });

    return res.status(200).json({
      message: "Relatório gerado com sucesso",
      id,
      dados: dadosRelatorio,
      nome: nomeRelatorio
    });

  } catch (err) {
    console.error('Erro ao gerar relatório:', err);
    return res.status(500).json({ error: "Erro ao gerar relatório" });
  }
};

// Funções auxiliares para gerar cada tipo de relatório

async function gerarRelatorioSensores(dataInicio, dataFim, tremId, sensorId) {
  let query = `
    SELECT 
      s.tipo_sensor,
      COUNT(*) as total_leituras,
      AVG(CAST(s.valor_sensor AS DECIMAL(10,2))) as valor_medio,
      MIN(CAST(s.valor_sensor AS DECIMAL(10,2))) as valor_minimo,
      MAX(CAST(s.valor_sensor AS DECIMAL(10,2))) as valor_maximo,
      GROUP_CONCAT(DISTINCT s.id_sensor ORDER BY s.id_sensor) as ids_sensores
    FROM sensores s
    WHERE 1=1
  `;

  const params = [];

  if (sensorId) {
    query += ` AND s.id_sensor = ?`;
    params.push(sensorId);
  }

  query += ` GROUP BY s.tipo_sensor ORDER BY s.tipo_sensor ASC`;

  const [sensores] = await db.query(query, params);

  // Se quiser ver todos os sensores individuais também
  let queryDetalhes = `SELECT * FROM sensores`;
  const paramsDetalhes = [];
  
  if (sensorId) {
    queryDetalhes += ` WHERE id_sensor = ?`;
    paramsDetalhes.push(sensorId);
  }
  
  queryDetalhes += ` ORDER BY id_sensor DESC`;
  
  const [detalhes] = await db.query(queryDetalhes, paramsDetalhes);

  return {
    total_tipos: sensores.length,
    total_sensores: detalhes.length,
    resumo_por_tipo: sensores,
    sensores_detalhados: detalhes,
    periodo: { inicio: dataInicio, fim: dataFim },
    observacao: 'Tabela sensores não possui controle de data. Mostrando todos os registros.'
  };
}

async function gerarRelatorioRotas(dataInicio, dataFim, tremId, rotaId) {
  let query = `
    SELECT 
      r.id_rota,
      r.saida_rota,
      r.chegada_rota,
      r.destino_rota,
      r.id_trem,
      t.modelo_trem,
      t.nome_trem
    FROM rotas r
    LEFT JOIN trens t ON r.id_trem = t.id_trem
    WHERE 1=1
  `;

  const params = [];

  // Tenta filtrar por data se os campos forem datas válidas
  // Se saida_rota e chegada_rota forem timestamps/dates
  if (dataInicio && dataFim) {
    query += ` AND (
      DATE(r.saida_rota) BETWEEN ? AND ?
      OR DATE(r.chegada_rota) BETWEEN ? AND ?
    )`;
    params.push(dataInicio, dataFim, dataInicio, dataFim);
  }

  if (tremId) {
    query += ` AND r.id_trem = ?`;
    params.push(tremId);
  }

  if (rotaId) {
    query += ` AND r.id_rota = ?`;
    params.push(rotaId);
  }

  query += ` ORDER BY r.id_rota DESC`;

  const [rotas] = await db.query(query, params);

  return {
    total_rotas: rotas.length,
    rotas: rotas,
    periodo: { inicio: dataInicio, fim: dataFim }
  };
}

async function gerarRelatorioManutencao(dataInicio, dataFim, tremId) {
  let query = `
    SELECT 
      m.id_manutencao,
      m.nome_manutencao,
      m.tipo_manutencao,
      m.mensagem_manutencao,
      m.id_trem,
      t.modelo_trem,
      t.nome_trem,
      u.nome_usuario
    FROM manutencao m
    LEFT JOIN trens t ON m.id_trem = t.id_trem
    LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario
    WHERE 1=1
  `;

  const params = [];

  // Como a data está dentro do JSON mensagem_manutencao, tentamos filtrar por ela
  if (dataInicio && dataFim) {
    query += ` AND (
      JSON_UNQUOTE(JSON_EXTRACT(m.mensagem_manutencao, '$.data_pedido')) BETWEEN ? AND ?
      OR JSON_UNQUOTE(JSON_EXTRACT(m.mensagem_manutencao, '$.data')) BETWEEN ? AND ?
    )`;
    params.push(dataInicio, dataFim, dataInicio, dataFim);
  }

  if (tremId) {
    query += ` AND m.id_trem = ?`;
    params.push(tremId);
  }

  query += ` ORDER BY m.id_manutencao DESC`;

  const [manutencoes] = await db.query(query, params);

  // Estatísticas
  let statsQuery = `
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN tipo_manutencao = 'preventiva' THEN 1 ELSE 0 END) as preventivas,
      SUM(CASE WHEN tipo_manutencao = 'corretiva' THEN 1 ELSE 0 END) as corretivas,
      SUM(CASE WHEN tipo_manutencao = 'pedido' THEN 1 ELSE 0 END) as pedidos
    FROM manutencao m
    WHERE 1=1
  `;
  
  const statsParams = [];
  
  if (dataInicio && dataFim) {
    statsQuery += ` AND (
      JSON_UNQUOTE(JSON_EXTRACT(m.mensagem_manutencao, '$.data_pedido')) BETWEEN ? AND ?
      OR JSON_UNQUOTE(JSON_EXTRACT(m.mensagem_manutencao, '$.data')) BETWEEN ? AND ?
    )`;
    statsParams.push(dataInicio, dataFim, dataInicio, dataFim);
  }
  
  if (tremId) {
    statsQuery += ` AND m.id_trem = ?`;
    statsParams.push(tremId);
  }

  const [stats] = await db.query(statsQuery, statsParams);

  return {
    total_manutencoes: manutencoes.length,
    estatisticas: stats[0] || {},
    manutencoes: manutencoes,
    periodo: { inicio: dataInicio, fim: dataFim }
  };
}

export const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await getReportById(id);
    
    if (!report) {
      return res.status(404).json({ error: "Relatório não encontrado" });
    }
    
    return res.status(200).json(report);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};