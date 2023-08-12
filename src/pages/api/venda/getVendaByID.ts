import VendaController from '@/core/controllers/venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const vendaId = parseInt(req.query.id as string);
        const venda = await VendaController.getVendaById(vendaId);
        if (!venda) {
            res.status(404).json({ error: 'Venda não encontrada' });
            return;
        }
        res.status(200).json(venda);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}