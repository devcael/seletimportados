import ItemsVendaController from '@/core/controllers/item_venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const itemData = req.body;

        try {
            const newItem = await ItemsVendaController.createNewItemVenda(itemData);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar novo item de venda: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};
