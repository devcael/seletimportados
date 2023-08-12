import ClientesController from "@/core/controllers/clientes_controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;

            const deleted = await ClientesController.excluirCliente(Number(id));

            if (deleted) {
                res.status(200).json({ message: 'Cliente excluído com sucesso' });
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir cliente: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};