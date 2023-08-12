import TiposDePagamentoController from '@/core/controllers/tipos_de_pagamento_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { tipo, nome_tipo } = req.body;

    if (!tipo || !nome_tipo) {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const novoTipoDePagamento = await TiposDePagamentoController.createNewTipoDePagamento(req.body);
        res.status(201).json(novoTipoDePagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}





