import TiposDePagamentoController from '@/core/controllers/tipos_de_pagamento_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const tipoDePagamentoId = parseInt(req.query.id as string);

    if (isNaN(tipoDePagamentoId)) {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const atualizado = await TiposDePagamentoController.updateTipoDePagamento(tipoDePagamentoId, req.body);
        if (atualizado) {
            res.status(200).json({ message: 'Tipo de pagamento atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Tipo de pagamento não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}