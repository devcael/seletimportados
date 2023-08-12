import FornecedoresController from "@/core/controllers/fornecedor_controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const body = req.body;
            const novoFornecedor = await FornecedoresController.createNewFornecedor(body);
            res.status(200).json(novoFornecedor);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar novo fornecedor: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};