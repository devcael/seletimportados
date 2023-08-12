import VincularIMEIController from '@/core/controllers/vincular_imei_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const vincularIMEIId = parseInt(req.query.id as string);

    if (isNaN(vincularIMEIId)) {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const vinculoIMEI = await VincularIMEIController.getVincularIMEIById(vincularIMEIId);

        if (vinculoIMEI === null) {
            res.status(404).json({ message: 'Vinculo não encontrado' });
            return;
        }

        res.status(200).json(vinculoIMEI);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
