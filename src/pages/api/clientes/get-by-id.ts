import ClientesController from "@/core/controllers/clientes_controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const cliente = await ClientesController.getClienteById(Number(id));

            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cliente: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};