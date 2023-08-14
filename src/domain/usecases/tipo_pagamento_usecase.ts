import TipoPagamento from '../models/TipoPagamento';
import ReqHttp from '../services/ReqHttp';

export default class TipoPagamentoUseCase {
    static async createTipoPagamento(tipoPagamento: TipoPagamento): Promise<boolean> {
        try {
            const { body } = await ReqHttp.post({
                path: '/tipopagamento/create',
                secondsTimeout: 10,
                body: tipoPagamento.toJson({ sendId: false }),
            });

            return body.success === true;
        } catch (error) {
            console.error('Erro ao criar o tipo de pagamento:', error);
            return false;
        }
    }

    static async getAllTipoPagamentos(): Promise<TipoPagamento[]> {
        try {
            const { body } = await ReqHttp.get({
                path: '/tipopagamento/getTodos',
                secondsTimeout: 10,
            });

            const listaTipoPagamentos: TipoPagamento[] = body;

            return listaTipoPagamentos;
        } catch (error) {
            console.error('Erro ao buscar todos os tipos de pagamento:', error);
            throw error;
        }
    }

    static async getTipoPagamentoById(id: number): Promise<TipoPagamento | null> {
        try {
            const path = `/tipopagamento/getById`;
            const secondsTimeout = 15;

            const { body } = await ReqHttp.get({
                path,
                queryParams: { id },
                secondsTimeout,
            });

            if (body) {
                const tipoPagamento = TipoPagamento.fromJson(body);
                return tipoPagamento;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar o tipo de pagamento:', error);
            throw error;
        }
    }

    static async updateTipoPagamento(id: number, tipoPagamento: {
        tipo?: 'AP' | 'AV';
        nome_tipo?: string;
    }): Promise<boolean> {
        try {
            const path = `/tipopagamento/update`;
            const secondsTimeout = 15;

            await ReqHttp.put({
                path,
                body: tipoPagamento,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao atualizar o tipo de pagamento:', error);
            return false;
        }
    }

    static async deleteTipoPagamento(id: number): Promise<boolean> {
        try {
            const path = `/tipopagamento/delete`;
            const secondsTimeout = 15;

            await ReqHttp.delete({
                path,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao deletar o tipo de pagamento:', error);
            return false;
        }
    }
}
