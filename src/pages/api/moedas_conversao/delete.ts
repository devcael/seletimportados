import { NextApiRequest, NextApiResponse } from 'next';
import MoedaConversaoController from '@/core/controllers/moeda_conversao_controller';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (req.method == 'DELETE') {

        try {
            const deleted = await MoedaConversaoController.excluirMoedaConversao(Number(id));
            res.status(200).json({ deleted });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir moeda de conversão' });
        }
    } else {
        res.status(500).json({ error: 'Método não permitido' });
    }
};