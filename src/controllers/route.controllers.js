import { insertRoute, getAllRoutes, getRouteById, deleteRoute, updateRoute } from "../models/route.models.js";

export const createRoute = async (req, res) => {
    try {
        const { saida_rota, chegada_rota, destino_rota, id_trem } = req.body;

        if (!saida_rota || !chegada_rota || !destino_rota || !id_trem) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const id = await insertRoute({ saida_rota, chegada_rota, destino_rota, id_trem });

        return res.status(200).json({ message: "Rota criada com sucesso", id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const getRoutes = async (req, res) => {
    try {
        const routes = await getAllRoutes();
        return res.status(200).json(routes);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const getRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await getRouteById(id);
        
        if (!route) {
            return res.status(404).json({ error: "Rota não encontrada" });
        }
        
        return res.status(200).json(route);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const deleteRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await deleteRoute(id);

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Rota não encontrada" });
        }

        return res.status(200).json({ message: "Rota deletada com sucesso" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export const updateRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const { saida_rota, chegada_rota, destino_rota, id_trem } = req.body;

        if (!saida_rota || !chegada_rota || !destino_rota || !id_trem) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const affectedRows = await updateRoute(id, { saida_rota, chegada_rota, destino_rota, id_trem });

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Rota não encontrada" });
        }

        return res.status(200).json({ message: "Rota atualizada com sucesso" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};