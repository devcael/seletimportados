import ClientesController from '@/core/controllers/clientes_controller';
import Cliente from '@/core/models/clientes_model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const body = req.body;
            const createCliente = await ClientesController.createNewCliente(body);
            res.status(200).json(createCliente);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar novo cliente: " + error });
        }
    } else if (req.method === 'GET') {
        try {
            const clientes = await ClientesController.findAll();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar clientes: " + error });
        }
    } else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};