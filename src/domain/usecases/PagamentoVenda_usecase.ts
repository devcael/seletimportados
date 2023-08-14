import PagamentoVenda from '../models/PagamentoVenda';
import TipoPagamento from '../models/TipoPagamento';
import ReqHttp from '../services/ReqHttp';
import TipoPagamentoUseCase from './tipo_pagamento_usecase';

export default class PagamentoVendaUseCase {
    static async createPagamentoVenda(pagamento: PagamentoVenda): Promise<boolean> {
        try {
            const { body } = await ReqHttp.post({
                path: '/pagamentovenda/createPagamentoVenda',
                secondsTimeout: 10,
                body: pagamento.toJson({ sendId: false }),
            });

            return body.success === true;
        } catch (error) {
            console.error('Erro ao criar o pagamento da venda:', error);
            return false;
        }
    }

    static async getAllPagamentosByVenda(vendaId: number): Promise<PagamentoVenda[]> {
        try {
            const queryParams = {
                id: vendaId,
            };

            const { body } = await ReqHttp.get({
                path: '/pagamentovenda/getPagamentoVendaById',
                queryParams,
                secondsTimeout: 10,
            });

            const listOfPagamentos: PagamentoVenda[] = body;


            let returnList: PagamentoVenda[] = [];


            for (let index = 0; index < listOfPagamentos.length; index++) {
                const currPagamentoJson = listOfPagamentos[index];
                const currPagamento: PagamentoVenda = PagamentoVenda.fromJson(currPagamentoJson);
                let currTipo: TipoPagamento | null = await TipoPagamentoUseCase.getTipoPagamentoById(currPagamento.id_tipo_pagamento);

                currPagamento.setTipoPagamento(currTipo);
                returnList.push(currPagamento);
            }

            return returnList;
        } catch (error) {
            console.error('Erro ao buscar pagamentos por venda:', error);
            throw error;
        }
    }

    static async getAllPagamentoVenda(): Promise<PagamentoVenda[]> {
        try {
            const { body } = await ReqHttp.get({
                path: '/pagamentovenda/getAllPagamentoVenda',
                secondsTimeout: 10,
            });

            const listOfPagamentos = body;

            let returnList: PagamentoVenda[] = [];

            for (let index = 0; index < listOfPagamentos.length; index++) {
                const currPagamentoJson = listOfPagamentos[index];
                const currPagamento: PagamentoVenda = PagamentoVenda.fromJson(currPagamentoJson);
                let currTipo: TipoPagamento | null = await TipoPagamentoUseCase.getTipoPagamentoById(currPagamento.id_tipo_pagamento);

                currPagamento.setTipoPagamento(currTipo);
                returnList.push(currPagamento);
            }

            return returnList;
        } catch (error) {
            console.error('Erro ao buscar todos os pagamentos de venda:', error);
            throw error;
        }
    }


}
