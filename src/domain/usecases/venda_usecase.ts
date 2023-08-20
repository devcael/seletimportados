import CabecalhoVenda from "../models/CabecalhoVenda";
import ItemVenda from "../models/ItemVenda";
import PagamentoVenda from "../models/PagamentoVenda";
import ReqHttp from "../services/ReqHttp";
import { QueryParamsPagination } from "../../types/QueryParamsPagination";
import Venda from "../models/Venda";
import Clientes from "../models/Clientes";
import TipoPagamento from "../models/TipoPagamento";
import ClientesUseCase from "./clientes_use_case";
import ItemVendaUseCase from "./items_venda_usecase";
import PagamentoVendaUseCase from "./PagamentoVenda_usecase";


export default class VendaUseCase {

    static async getVenda(params: { id_venda: number }): Promise<Venda> {
        try {
            const path = '/venda/getVendaByID';
            const secondsTimeout = 60;

            let response = await ReqHttp.get({
                path,
                secondsTimeout,
                queryParams: { id: params.id_venda }
            });

            let vendaJson: any = response.body;

            let venda: Venda = Venda.fromJson(vendaJson);


            console.log(venda);

            return venda;
        } catch (error) {
            console.error('Erro ao receber a venda:', error);
            throw error;
        }
    }

    static async getCabecalhosPaginados(params: {
        queryParams: QueryParamsPagination
    }): Promise<CabecalhoVenda[]> {
        try {
            const path = '/venda/getVendasPaginadas';
            const secondsTimeout = 60;

            let response = await ReqHttp.get({
                path,
                queryParams: params.queryParams,
                secondsTimeout,
            });

            console.log("Path Response:", params.queryParams);


            let listOfVendasJson = response.body;


            let listOfCabecalhoVendas: CabecalhoVenda[] = [];

            for (let index = 0; index < listOfVendasJson.vendas.length; index++) {
                const currVenda = listOfVendasJson.vendas[index];

                try {
                    let currCabecalho = CabecalhoVenda.fromJson(currVenda);


                    listOfCabecalhoVendas.push(currCabecalho);
                } catch (error) {
                    console.log("Erro ao converter o cabecalho: ", error);

                }


            }

            return listOfCabecalhoVendas;
        } catch (error) {
            console.error('Erro ao enviar o produto:', error);
            throw error;
        }
    }


    static async createVenda(cabecalho: CabecalhoVenda): Promise<CabecalhoVenda> {

        try {
            const path = '/venda/create';
            const secondsTimeout = 15;

            let cabecalhoVenda = await ReqHttp.post({
                path,
                body: cabecalho.toJson({ sendId: false }),
                secondsTimeout,
            });

            let novoCabecalho: CabecalhoVenda = CabecalhoVenda.fromJson(cabecalhoVenda.body);


            return novoCabecalho;
        } catch (error) {
            console.error('Erro ao enviar o item venda:', error);
            throw error;
        }

    }

    static async updateVenda(id_cabecalho: number, cabecalho: {
        data?: string,
        hora?: string,
        totalvenda?: string,
        situacao?: string | null,
        id_usuario?: number,
        id_cliente?: number,
        desconto?: string | null,
        acrescimo?: string | null,
        subtotal?: string,
        totalcomdescontoeacrescimo?: string,
        tipo?: string,
        nome?: string,
    }) {

        try {
            const path = '/venda/update';
            const secondsTimeout = 15;

            await ReqHttp.put({
                path,
                body: cabecalho,
                queryParams: { id: id_cabecalho },
                secondsTimeout,
            });

            return true;
        } catch (error) {
            console.error('Erro ao enviar o item venda:', error);
            throw error;
        }

    }

    static async deleteVenda(id_cabecalho: number) {

        try {
            const path = '/venda/delete';
            const secondsTimeout = 15;

            await ReqHttp.delete({
                path,

                queryParams: { id: id_cabecalho },
                secondsTimeout,
            });

            return true;
        } catch (error) {
            console.error('Erro ao enviar o item venda:', error);
            throw error;
        }

    }
}