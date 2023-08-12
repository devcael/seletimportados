import { NextApiRequest, NextApiResponse } from 'next';
import MoedaConversaoController from '@/core/controllers/moeda_conversao_controller';
export default async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const dolar = await MoedaConversaoController.getDolar();
        res.status(200).json(dolar);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dolar' });
    }
};