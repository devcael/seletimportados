import ProdutosController from '@/core/controllers/produtos_controller';
import Produto from '@/core/models/produtos_model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {

        let body = req.body;

        try {
            let createProduct = await ProdutosController.createNewProduct(body);
            res.status(200).json(createProduct);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar novo produto" });
        }

    }
    else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};
