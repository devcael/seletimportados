import MoedaConversaoController from "@/core/controllers/moeda_conversao_controller";
import ProdutosController from "@/core/controllers/produtos_controller";
import ProdutoModel from "@/core/models/produtos_model";
import { NextApiRequest, NextApiResponse } from "next";



export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { page, pageSize, search } = req.query;

    if (req.method === 'GET') {

        let { produtos, totalCount, currPage } = await ProdutosController.buscarProdutosPaginados(Number(page), Number(pageSize), String(search));

        if (produtos != null) {

            let listOfProducts = []

            for (let index = 0; index < produtos.length; index++) {
                const currProduto = produtos[index];


                let moedaCusto = await MoedaConversaoController.getMoedaConversao(currProduto.id_moeda_custo);
                let moedaPreco = await MoedaConversaoController.getMoedaConversao(currProduto.id_moeda_preco);

                let newProduto = { currProduto, moedaCusto, moedaPreco };

                listOfProducts[index] = newProduto;

            }

            res.status(200).json({ listOfProducts, totalCount, currPage });
        }


    } else if (req.method === "DELETE") {

        res.status(405).json({ error: 'Método não permitido' });
    }
    else {
        // Tratamento para outros métodos de requisição
        res.status(405).json({ error: 'Método não permitido' });
    }
};