import MoedaConversaoController from '@/core/controllers/moeda_conversao_controller';
import MoedaConversaoModel from '@/core/models/moeda_conversao_model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    // const codigo = parseInt(req.query.codigo as string);

    // if (isNaN(codigo)) {
    //     res.status(500).json({ message: "Não é um id válido" })
    // }


    if (req.method === 'GET') {

        try {

            let listOfMoedas: MoedaConversaoModel[] | null = await MoedaConversaoController.getAllMoedaConversao();

            res.status(200).json(listOfMoedas);
        } catch (error) {
            res.status(500).json({ message: error })
        }


    } else if (req.method === "DELETE") {

        res.status(405).json({ error: 'Método não permitido' });
    }
    else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};