import VendaController from "@/core/controllers/venda_controller";
import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { currPage, pageSize, search, tipo, dataInicial, dataFinal, situacao } = req.query;

        if (!currPage || !pageSize) {
            res.status(400).json({ error: 'Parâmetros inválidos' });
            return;
        }
        const vendas = await VendaController.buscarVendasPaginadas(
            parseInt(currPage as string),
            parseInt(pageSize as string),
            search as string,
            tipo as string,
            dataInicial as string,
            dataFinal as string,
            situacao as string
        );
        res.status(200).json(vendas);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}