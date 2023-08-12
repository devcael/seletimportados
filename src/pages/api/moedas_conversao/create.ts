import { NextApiRequest, NextApiResponse } from 'next';
import MoedaConversaoController from '@/core/controllers/moeda_conversao_controller';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const moedaConversao = req.body;

    try {
        const newMoedaConversao = await MoedaConversaoController.createNewMoedaConversao(moedaConversao);
        res.status(201).json(newMoedaConversao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar nova moeda de conversão' });
    }
};