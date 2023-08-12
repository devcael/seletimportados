import TiposDePagamentoController from '@/core/controllers/tipos_de_pagamento_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const tipoDePagamentoId = parseInt(req.query.id as string);

    if (isNaN(tipoDePagamentoId)) {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const tipoDePagamento = await TiposDePagamentoController.getTipoDePagamentoById(tipoDePagamentoId);

        if (tipoDePagamento === null || tipoDePagamento === undefined) {
            res.status(404).json({ message: 'Tipo de pagamento não encontrado' });
            return;
        }

        res.status(200).json(tipoDePagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
