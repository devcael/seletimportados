import ItemVenda from "../models/ItemVenda";
import Produto from "../models/Produto";
import ReqHttp from "../services/ReqHttp";
import ProdutoUseCase from "./produto_usecase";

export default class ItemVendaUseCase {



    static async getById(id: number) {
        try {
            let url: string = "/itemvenda/getItemsVendaById";

            let response = await ReqHttp.get({ path: url, queryParams: { id: id }, secondsTimeout: 10, });

            console.log(response.body);

            let itemVendaJson = response.body;

            let idProduto = Number(itemVendaJson.id_produto);
            let idVenda = Number(itemVendaJson.id_itens_venda);

            let produto: Produto = await ProdutoUseCase.getById(idProduto);


            let newItemVenda: ItemVenda = ItemVenda.fromJSON(itemVendaJson);

            newItemVenda.setProduto(produto);
            newItemVenda.setImei(null);

            console.log(newItemVenda);
        } catch (error) {
            throw error;
        }

    }

    static async getAllByIdVenda(id_venda: number): Promise<ItemVenda[]> {
        try {
            let url: string = "/itemvenda/findAllItemsVendaByIdVenda";

            let response = await ReqHttp.get({ path: url, queryParams: { id_venda: id_venda }, secondsTimeout: 10, });

            console.log(response.body);



            let listOfItemsJson: Array<any> = response.body;

            let listOfItems: ItemVenda[] = [];

            for (let index = 0; index < listOfItemsJson.length; index++) {
                const currItemVenda = listOfItemsJson[index];

                let idProduto = Number(currItemVenda.id_produto);
                let idVenda = Number(currItemVenda.id_itens_venda);

                let produto: Produto = await ProdutoUseCase.getById(idProduto);


                let newItemVenda: ItemVenda = ItemVenda.fromJSON(currItemVenda);

                newItemVenda.setProduto(produto);
                newItemVenda.setImei(null);

                console.log(newItemVenda);
                listOfItems.push(newItemVenda);

            }

            console.log(listOfItems.length);

            return listOfItems;


        } catch (error) {
            throw error;
        }

    }


    static async enviarItemVenda(itemVenda: ItemVenda): Promise<ItemVenda> {
        try {
            const path = '/itemvenda/createNewItemVenda';
            const secondsTimeout = 15;

            let response = await ReqHttp.post({
                path,
                body: itemVenda.toJson({ sendId: false }),
                secondsTimeout,
            });

            let newItemVenda = ItemVenda.fromJSON(response.body);


            return newItemVenda;
        } catch (error) {
            console.error('Erro ao enviar o item venda:', error);
            throw error;
        }
    }

    static async updateItemVenda(idItem: number, itemVenda: {
        id_produto?: number,
        nome_produto?: string,
        preco_produto?: number,
        custo_produto?: number,
        quantidade?: number,
        acrescimo?: number | null,
        desconto?: number | null,
        valortotal?: number,
        id_moeda_custo_produto?: number,
        taxa_moeda_custo_produto?: number,
        id_moeda_preco_produto?: number,
        taxa_moeda_preco_produto?: number,
        id_venda?: number
    }): Promise<boolean> {
        try {
            const path = '/itemvenda/updateItemVenda';
            const secondsTimeout = 15;

            await ReqHttp.put({
                path,
                body: { ...itemVenda },
                queryParams: { id: idItem },
                secondsTimeout,
            });

            return true;
        } catch (error) {
            console.error('Erro ao enviar o produto:', error);
            return false;
        }
    }



}
