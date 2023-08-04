import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        // Lógica para tratamento da requisição GET
        res.status(200).json({ message: 'Requisição GET recebida' });
    } else if (req.method === 'POST') {
        // Lógica para tratamento da requisição POST
        res.status(200).json({ message: 'Requisição POST recebida' });
    } else if (req.method === 'PUT') {
        // Lógica para tratamento da requisição PUT
        res.status(200).json({ message: 'Requisição PUT recebida' });
    } else if (req.method === 'DELETE') {
        // Lógica para tratamento da requisição DELETE
        res.status(200).json({ message: 'Requisição DELETE recebida' });
    } else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};
