import PagamentoVendaController from '@/core/controllers/pagamento_venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const pagamentoId = parseInt(req.query.id as string);

    if (isNaN(pagamentoId)) {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const pagamento = await PagamentoVendaController.getPagamentoVendaById(pagamentoId);

        if (pagamento === null) {
            res.status(404).json({ message: 'Pagamento não encontrado' });
            return;
        }
        res.status(200).json(pagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}