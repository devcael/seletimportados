import MoedaConversaoController from "@/core/controllers/moeda_conversao_controller";
import ProdutosController from "@/core/controllers/produtos_controller";
import ProdutoModel from "@/core/models/produtos_model";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'GET') {

        let listOfProductis: ProdutoModel[] | null = await ProdutosController.findAll();

        if (listOfProductis != null) {

            let listOfProducts = []

            for (let index = 0; index < listOfProductis.length; index++) {
                const currProduto = listOfProductis[index];


                let moedaCusto = await MoedaConversaoController.getMoedaConversao(currProduto.id_moeda_custo);
                let moedaPreco = await MoedaConversaoController.getMoedaConversao(currProduto.id_moeda_preco);

                let newProduto = { currProduto, moedaCusto, moedaPreco };

                listOfProducts[index] = newProduto;

            }

            res.status(200).json(listOfProducts);
        }


    } else if (req.method === "DELETE") {

        res.status(405).json({ error: 'Método não permitido' });
    }
    else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};