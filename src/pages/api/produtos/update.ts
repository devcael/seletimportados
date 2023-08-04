import ProdutosController from '@/core/controllers/produtos_controller';
import Produto from '@/core/models/produtos_model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'PUT') {

        let body = req.body;

        let codigo: number = body.id;

        if (isNaN(codigo)) {
            res.status(500).json({ message: "Não é um id válido" })
        }

        try {
            await ProdutosController.updateProduct(codigo, body);

            res.status(200).json({ message: "Produto atualizado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar o seu produto" });
        }

    }
    else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};
