import EmpresaController from '@/core/controllers/empresa_controller';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const empresa = await EmpresaController.getCadEmpresaById(1);
            if (empresa) {
                res.status(200).json(empresa);
            } else {
                res.status(404).json({ message: 'Empresa não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar empresa' });
        }
    } else if (req.method === 'PUT') {

        const novosDados = req.body;

        try {
            const updated = await EmpresaController.updateEmpresa(1, novosDados);
            if (updated) {
                res.status(200).json({ message: 'Empresa atualizada com sucesso' });
            } else {
                res.status(404).json({ message: 'Empresa não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar empresa' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}