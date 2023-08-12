import PagamentoVendaController from '@/core/controllers/pagamento_venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { id_venda, id_tipo_pagamento, valorpago, troco } = req.body;

    if (
        isNaN(id_venda) ||
        isNaN(id_tipo_pagamento) ||
        isNaN(valorpago) ||
        (troco !== null && isNaN(troco))
    ) {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const novoPagamento = await PagamentoVendaController.createNewPagamentoVenda(req.body);
        res.status(201).json(novoPagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
