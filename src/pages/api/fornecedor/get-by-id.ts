import FornecedoresController from "@/core/controllers/fornecedor_controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const fornecedor = await FornecedoresController.getFornecedorById(Number(id));

            if (fornecedor) {
                res.status(200).json(fornecedor);
            } else {
                res.status(404).json({ error: 'Fornecedor não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar fornecedor: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};