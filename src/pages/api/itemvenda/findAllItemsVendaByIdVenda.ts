import ItemsVendaController from '@/core/controllers/item_venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const vendaId = Number(req.query.id_venda);

        try {
            const items = await ItemsVendaController.findAllByIdVenda(vendaId);
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar todos os itens de venda por ID da venda: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};
