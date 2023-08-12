import FornecedoresController from "@/core/controllers/fornecedor_controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const body = req.body;
            const updated = await FornecedoresController.updateFornecedor(Number(id), body);

            if (updated) {
                res.status(200).json({ message: 'Fornecedor atualizado com sucesso' });
            } else {
                res.status(404).json({ error: 'Fornecedor não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar fornecedor: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};