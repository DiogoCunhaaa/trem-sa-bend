// controllers/route.controllers.js
import {
    insertRoute,
    getAllRoutes,
    getRouteById,
    deleteRoute,
    updateRoute
} from "../models/route.models.js";

export const createRoute = async (req, res) => {
    try {
        const { saida_rota, chegada_rota, destino_rota, id_trem } = req.body;

        if (!saida_rota || !chegada_rota || !destino_rota || !id_trem) {
            return res.status(400).json({ message: "Preencha todos os campos." });
        }

        const id = await insertRoute({ saida_rota, chegada_rota, destino_rota, id_trem });
        return res.status(201).json({ message: "Rota criada com sucesso!", id });
    } catch (error) {
        console.error("Erro ao criar rota:", error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};

export const getRoutes = async (req, res) => {
    try {
        const routes = await getAllRoutes();
        return res.json(routes);
    } catch (error) {
        console.error("Erro ao listar rotas:", error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};

export const getRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await getRouteById(id);

        if (!route) {
            return res.status(404).json({ message: "Rota não encontrada." });
        }

        return res.json(route);
    } catch (error) {
        console.error("Erro ao buscar rota:", error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};

export const deleteRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteRoute(id);

        if (!deleted) {
            return res.status(404).json({ message: "Rota não encontrada." });
        }

        return res.json({ message: "Rota deletada com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar rota:", error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};

export const updateRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const { saida_rota, chegada_rota, destino_rota, id_trem } = req.body;

        const updated = await updateRoute(id, {
            saida_rota,
            chegada_rota,
            destino_rota,
            id_trem
        });

        if (!updated) {
            return res.status(404).json({ message: "Rota não encontrada." });
        }

        return res.json({ message: "Rota atualizada com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar rota:", error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};
