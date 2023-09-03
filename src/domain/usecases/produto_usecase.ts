import ProdutoModel from "@/core/models/produtos_model";
import { log } from "node:console";
import ReqHttp from "../services/ReqHttp";
import Produto from "../models/Produto";

export default class ProdutoUseCase {

    static async getAllProdutos(): Promise<Produto[]> {
        try {
            let { body } = await ReqHttp.get({ path: '/produtos/produtos', secondsTimeout: 60 });

            let listOfProduto = body.listOfProducts;

            var listProdutoBuffer: Produto[] = [];

            for (let index = 0; index < listOfProduto.length; index++) {
                const element = listOfProduto[index];

                let currProduto: Produto = Produto.fromJSON(element);

                listProdutoBuffer.push(currProduto);

            }

            return listProdutoBuffer;

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    static async getById(id: number): Promise<Produto> {
        try {



            let { body } = await ReqHttp.get({ path: `/produtos/${id}`, secondsTimeout: 10, });

            let currProduto: Produto = Produto.fromJSON(body);

            return currProduto;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getAllProdutoPaginados(page: number, limit: number, search: string, active: boolean): Promise<Produto[]> {
        try {

            let queryParams = {
                page: page,
                pageSize: limit,
                active: active,
                search: search
            }

            let { body } = await ReqHttp.get({ path: '/produtos/page', secondsTimeout: 10, queryParams: queryParams });

            let listOfProduto = body.listOfProducts;

            var listProdutoBuffer: Produto[] = [];

            for (let index = 0; index < listOfProduto.length; index++) {
                const element = listOfProduto[index];

                let currProduto: Produto = Produto.fromJSON(element);

                listProdutoBuffer.push(currProduto);

            }

            return listProdutoBuffer;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async createProduto(produto: {
        nome: string,
        ean: string | null,
        preco: number,
        custo: number,
        id_fornecedor: number,
        id_moeda_custo: number,
        id_moeda_preco: number,
        valor_moeda_preco: number,
        valor_moeda_custo: number,
        ativo: boolean | null,
        data_de_cadastro: Date | null,
        estoque: number | null,
        marca: string | null
    }) {

        try {
            let { body } = await ReqHttp.post({ path: '/produtos/create', secondsTimeout: 10, body: produto });

            console.log(body);


        } catch (error) {
            throw error;
        }

    }

    static async enviarProduto(produto: Produto): Promise<boolean> {
        try {
            const path = '/produtos/create';
            const secondsTimeout = 15;

            await ReqHttp.post({
                path,
                body: produto.toJson({ sendId: false }),
                secondsTimeout,
            });

            return true;
        } catch (error) {
            console.error('Erro ao enviar o produto:', error);
            throw error;
        }
    }

    static async updateProduto(id_produto: number, produto: {
        nome?: string,
        ean?: string | null,
        preco?: number,
        custo?: number,
        id_fornecedor?: number,
        id_moeda_custo?: number,
        id_moeda_preco?: number,
        valor_moeda_preco?: number,
        valor_moeda_custo?: number,
        ativo?: boolean | null,
        data_de_cadastro?: Date | null,
        estoque?: number | null,
        marca?: string | null,
    }): Promise<boolean> {
        try {
            const path = '/produtos/update';
            const secondsTimeout = 15;

            await ReqHttp.put({
                path,
                body: { id: id_produto, ...produto },
                secondsTimeout,
            });

            return true;
        } catch (error) {
            console.error('Erro ao enviar o produto:', error);
            return false;
        }
    }

    static async deletearProduto(id_produto: number
    ): Promise<boolean> {
        try {
            const path = `/produtos/${id_produto}`;
            const secondsTimeout = 15;

            await ReqHttp.delete({
                path,
                secondsTimeout,
            });

            return true;
        } catch (error) {
            console.error('Erro ao enviar o produto:', error);
            return false;
        }
    }

}