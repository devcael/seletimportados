import { NextApiRequest, NextApiResponse } from 'next';
import MoedaConversaoController from '@/core/controllers/moeda_conversao_controller';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const novosDados = req.body;

    try {
        const updated = await MoedaConversaoController.updateMoedaConversao(Number(id), novosDados);
        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar moeda de conversão' });
    }
};