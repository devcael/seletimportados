import FornecedoresController from "@/core/controllers/fornecedor_controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { page, pageSize, search } = req.query;

    if (req.method === 'GET') {
        try {
            const { fornecedores, totalCount, currPage } = await FornecedoresController.buscarFornecedoresPaginados(Number(page), Number(pageSize), String(search));
            res.status(200).json({ fornecedores, totalCount, currPage });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar fornecedores: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};