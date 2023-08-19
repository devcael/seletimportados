import { NextApiRequest, NextApiResponse } from 'next';
import { UserController } from '../../core/controllers/user_controller';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, senha } = req.body;

    try {
      const user = await UserController.loginUser(nome, senha);
      if (user) {
        return res.status(200).json({ message: 'Login bem-sucedido.' });
      } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
    } catch (error) {
      return res.status(500).json({ message: `Erro ao fazer login. ${error}` });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido.' });
  }
}