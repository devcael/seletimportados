import VincularIMEIController from '@/core/controllers/vincular_imei_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const itemVendaId = parseInt(req.query.itemvenda as string);

    if (isNaN(itemVendaId)) {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const vinculosIMEI = await VincularIMEIController.findAllVenda(itemVendaId);

        if (vinculosIMEI === null) {
            res.status(404).json({ message: 'Vinculos não encontrados' });
            return;
        }


        res.status(200).json(vinculosIMEI);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}