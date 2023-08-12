import VincularIMEIController from '@/core/controllers/vincular_imei_controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const vincularIMEIId = parseInt(req.query.id as string);

    if (isNaN(vincularIMEIId)) {
        res.status(400).json({ message: 'Invalid input' });
        return;
    }

    try {
        const excluido = await VincularIMEIController.excluirVincularIMEI(vincularIMEIId);
        if (excluido) {
            res.status(200).json({ message: 'Registro de vinculação de IMEI excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Registro de vinculação de IMEI não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
