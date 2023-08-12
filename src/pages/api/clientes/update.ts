import ClientesController from "@/core/controllers/clientes_controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        try {
            const { id } = req.query;
            const body = req.body;

            const updated = await ClientesController.updateCliente(Number(id), body);

            if (updated) {
                res.status(200).json({ message: 'Cliente atualizado com sucesso' });
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar cliente: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};