import ReqHttp from '../services/ReqHttp';
import MoedaConversao from '../models/MoedaConversao';

export default class MoedaConversaoUseCase {
    static async getAllMoedas(): Promise<MoedaConversao[]> {
        try {
            const path = '/moedas_conversao/moedas';
            const secondsTimeout = 10;

            const { body } = await ReqHttp.get({
                path,
                secondsTimeout,
            });

            const listOfMoedas: MoedaConversao[] = body.map((moedaJson: any) =>
                MoedaConversao.fromJSON(moedaJson)
            );

            return listOfMoedas;
        } catch (error) {
            console.error('Erro ao obter as moedas:', error);
            throw error;
        }
    }

    static async updateMoeda(id: number, moeda: {
        nome_da_moeda: string,
        taxa_de_conversao_real: number,
        simbolo: string,
    }): Promise<boolean> {
        try {
            const path = `/moedas_conversao/update`;
            const secondsTimeout = 15;

            const { body } = await ReqHttp.put({
                path,
                secondsTimeout,
                queryParams: { id },
                body: moeda,
            });

            return body.updated === true;
        } catch (error) {
            console.error('Erro ao atualizar a moeda:', error);
            return false;
        }
    }

    static async getMoedaById(id: number): Promise<MoedaConversao | null> {
        try {
            const path = `/moedas_conversao/${id}`;
            const secondsTimeout = 15;

            const { body } = await ReqHttp.get({
                path,
                secondsTimeout,
            });

            if (body) {
                const moeda = MoedaConversao.fromJSON(body);
                return moeda;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar a moeda com ID ${id}:`, error);
            throw error;
        }
    }

    static async getMoedaDolar(): Promise<MoedaConversao | null> {
        try {
            const path = '/moedas_conversao/getDollar';
            const secondsTimeout = 15;

            const { body } = await ReqHttp.get({
                path,
                secondsTimeout,
            });

            if (body && body.length > 0) {
                const dolarMoeda = MoedaConversao.fromJSON(body[0]);
                return dolarMoeda;
            }

            return null;
        } catch (error) {
            console.error('Erro ao buscar a moeda DOLAR:', error);
            throw error;
        }
    }

    static async deleteMoeda(id: number): Promise<boolean> {
        try {
            const path = `/moedas_conversao/delete`;
            const secondsTimeout = 15;

            await ReqHttp.delete({
                path,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao excluir a moeda:', error);
            return false;
        }
    }

    static async createMoeda(moeda: MoedaConversao): Promise<boolean> {
        try {
            const path = '/moedas_conversao/create';
            const secondsTimeout = 15;

            await ReqHttp.post({
                path,
                body: moeda.toJson({ sendId: false }),
                secondsTimeout,
            });

            return true;
        } catch (error) {
            console.error('Erro ao criar a moeda:', error);
            return false;
        }
    }
}