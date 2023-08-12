import ItemsVendaController from '@/core/controllers/item_venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const itemId = Number(req.query.id);

        try {
            const item = await ItemsVendaController.getItemsVendaById(itemId);

            if (item === null) {
                res.status(404).json({ message: 'Item de venda não encontrado' });
                return;
            }
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar item de venda por ID: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};
