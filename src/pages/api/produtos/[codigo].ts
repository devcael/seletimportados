import MoedaConversaoController from '@/core/controllers/moeda_conversao_controller';
import ProdutosController from '@/core/controllers/produtos_controller';
import Produto from '@/core/models/produtos_model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const codigo = parseInt(req.query.codigo as string);

    console.log(codigo);


    if (isNaN(codigo)) {
        res.status(500).json({ message: "Não é um id válido" })
    }


    if (req.method === 'GET') {

        let currProduto: Produto | null = await ProdutosController.getProdutoByID(codigo);

        if (currProduto != null) {
            let moedaCusto = await MoedaConversaoController.getMoedaConversao(currProduto.id_moeda_custo);
            let moedaPreco = await MoedaConversaoController.getMoedaConversao(currProduto.id_moeda_preco);

            let newProduto = { currProduto, moedaCusto, moedaPreco };


            res.status(200).json(newProduto);
            return;
        }

        res.status(404).json({ message: "Produto não encontrado." });

    } else if (req.method === "DELETE") {
        let deleteProduct: boolean = await ProdutosController.excluirProduto(codigo);

        if (deleteProduct == true) {
            res.status(200).json({ message: "Produto Excluido com sucesso!" });
            return;
        }

        res.status(404).json({ message: "Produto não encontrado." });

    }
    else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};
