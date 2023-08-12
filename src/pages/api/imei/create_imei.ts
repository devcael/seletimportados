import VincularIMEIController from '@/core/controllers/vincular_imei_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { id_itemvenda, numeroimei } = req.body;

    if (isNaN(id_itemvenda) || typeof numeroimei !== 'string') {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const novoVinculoIMEI = await VincularIMEIController.createNewVincularIMEI(req.body);
        res.status(201).json(novoVinculoIMEI);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}