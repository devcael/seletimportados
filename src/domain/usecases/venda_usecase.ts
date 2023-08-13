import CabecalhoVenda from "../models/CabecalhoVenda";
import ItemVenda from "../models/ItemVenda";
import PagamentoVenda from "../models/PagamentoVenda";
import ReqHttp from "../services/ReqHttp";
import { QueryParamsPagination } from "../../types/QueryParamsPagination";


export default class VendaUseCase {

    static async getVenda(params: { id_venda: number }) {
        try {
            const path = '/venda/getVendaByID';
            const secondsTimeout = 60;

            let response = await ReqHttp.get({
                path,
                secondsTimeout,
                queryParams: { id: params.id_venda }
            });

            let vendaJson: any = response.body;

            console.log('vendaJson', vendaJson);

            let venda: CabecalhoVenda = CabecalhoVenda.fromJson(vendaJson);

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

            let listOfVendasJson: Array<any> = response.body;

            console.log('listOfVendasJson', listOfVendasJson);


            let listOfCabecalhoVendas: CabecalhoVenda[] = [];

            for (let index = 0; index < listOfVendasJson.length; index++) {
                const currVenda = listOfVendasJson[index];

                let currCabecalho = CabecalhoVenda.fromJson(currVenda);

                console.log(currCabecalho);


                listOfCabecalhoVendas.push(currCabecalho);
            }

            return listOfCabecalhoVendas;
        } catch (error) {
            console.error('Erro ao enviar o produto:', error);
            throw error;
        }
    }


    static async createVenda(cabecalho: CabecalhoVenda) {

        try {
            const path = '/venda/create';
            const secondsTimeout = 15;

            await ReqHttp.post({
                path,
                body: cabecalho.toJson({ sendId: false }),
                secondsTimeout,
            });

            return true;
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