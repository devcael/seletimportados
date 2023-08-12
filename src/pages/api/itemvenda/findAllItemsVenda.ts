import ItemsVendaController from '@/core/controllers/item_venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const items = await ItemsVendaController.findAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar todos os itens de venda: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};
