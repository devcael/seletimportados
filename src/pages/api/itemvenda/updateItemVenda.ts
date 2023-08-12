import ItemsVendaController from '@/core/controllers/item_venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const itemId = Number(req.query.id);
        const newItemData = req.body;

        try {
            const updated = await ItemsVendaController.updateItemVenda(itemId, newItemData);
            res.status(200).json({ updated });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar item de venda: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};
