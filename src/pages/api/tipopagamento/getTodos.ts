import TiposDePagamentoController from '@/core/controllers/tipos_de_pagamento_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    try {
        const tiposDePagamento = await TiposDePagamentoController.findAll();
        res.status(200).json(tiposDePagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}