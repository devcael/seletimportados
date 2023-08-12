import VendaController from '@/core/controllers/venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const novaVenda = req.body;
        if (!novaVenda) {
            res.status(400).json({ error: 'Dados inválidos' });
            return;
        }
        const vendaCriada = await VendaController.createNewVenda(novaVenda);
        res.status(201).json(vendaCriada);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor ' + error });
    }
}