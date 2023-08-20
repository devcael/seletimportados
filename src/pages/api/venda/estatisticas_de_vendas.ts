import VendaController, { DadosEstatisticos } from '@/core/controllers/venda_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const dataInicial = req.query.dataInicial as string;
            const dataFinal = req.query.dataFinal as string;

            const result: DadosEstatisticos | null = await VendaController.obterDadosEstatisticos(dataInicial, dataFinal);

            if (result == null) {
                res.status(200).json({
                    total_receita: 0.00,
                    lucro: 0.00,
                    quantidade_vendas: 0,
                    produto_mais_vendido: "Não foi possivel definir"
                });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter os dados estatísticos.', message: error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido.' });
    }
}