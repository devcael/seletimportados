import ClientesController from "@/core/controllers/clientes_controller";
import ClienteModel from "@/core/models/clientes_model";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { page, pageSize, search } = req.query;

    if (req.method === 'GET') {
        try {
            const { clientes, totalCount, currPage } = await ClientesController.buscarClientesPaginados(Number(page), Number(pageSize), String(search));

            if (clientes != null) {
                res.status(200).json({ clientes, totalCount, currPage });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar clientes: ' + error });
        }
    } else if (req.method === "DELETE") {
        res.status(405).json({ error: 'Método não permitido' });
    } else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};