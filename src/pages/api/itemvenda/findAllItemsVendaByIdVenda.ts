import ItemsVendaController from '@/core/controllers/item_venda_controller';
import ItemsVenda from '@/core/models/item_venda_model';
import Imei from '@/domain/models/Imei';
import Produto from '@/domain/models/Produto';
import ImeiUseCase from '@/domain/usecases/imei_use_case';
import ProdutoUseCase from '@/domain/usecases/produto_usecase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const vendaId = Number(req.query.id_venda);

        try {
            const items: ItemsVenda[] | null = await ItemsVendaController.findAllByIdVenda(vendaId);

            if (items == null) {
                res.status(200).json([]);
                return;
            }

            let listOfResponse: any[] = [];

            for (let index = 0; index < items.length; index++) {
                const currItem: ItemsVenda = items[index];

                let idItem = currItem.id_itens_venda;
                let idProduto = currItem.id_produto;


                let currProduto: Produto = await ProdutoUseCase.getById(idProduto);
                let currImei: Imei | null = await ImeiUseCase.getAllImeisByItemVenda(idItem);


                let makeBody = {
                    ...currItem.dataValues,
                    produto: currProduto,
                    imei: currImei
                }

                listOfResponse.push(makeBody);
            }

            res.status(200).json(listOfResponse);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar todos os itens de venda por ID da venda: ' + error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};
