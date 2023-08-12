import FornecedoresController from "@/core/controllers/fornecedor_controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const fornecedores = await FornecedoresController.findAll();
            res.status(200).json(fornecedores);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar fornecedores: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};