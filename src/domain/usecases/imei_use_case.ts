import Imei from '../models/Imei';
import ReqHttp from '../services/ReqHttp';

export default class ImeiUseCase {
    static async createImei(imei: Imei): Promise<boolean> {
        try {
            const { body } = await ReqHttp.post({
                path: '/imei/create_imei',
                secondsTimeout: 10,
                body: imei.toJson({ sendId: false }),
            });

            return body.success === true;
        } catch (error) {
            console.error('Erro ao criar o IMEI:', error);
            return false;
        }
    }

    static async getAllImeisByItemVenda(itemvendaId: number): Promise<Imei | null> {
        try {
            const queryParams = {
                itemvenda: itemvendaId,
            };

            const { body } = await ReqHttp.get({
                path: '/imei/getAllByItemVenda',
                queryParams,
                secondsTimeout: 10,
            });

            const imei: Imei | null = body.length > 0 ? Imei.fromJson(body[0]) : null;

            return imei;
        } catch (error) {
            console.error('Erro ao buscar IMEIs por itemvenda:', error);
            throw error;
        }
    }

    static async getImeiById(id: number): Promise<Imei | null> {
        try {
            const path = `/imei/getById`;
            const secondsTimeout = 15;

            const { body } = await ReqHttp.get({
                path,
                secondsTimeout,
                queryParams: { id },
            });

            if (body) {
                const imei = Imei.fromJson(body);
                return imei;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar o IMEI:', error);
            throw error;
        }
    }

    static async updateImei(id: number, imei: {
        id_itemvenda?: number;
        numeroimei?: string;
    }): Promise<boolean> {
        try {
            const path = `/imei/update`;
            const secondsTimeout = 15;

            await ReqHttp.put({
                path,
                body: imei,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao atualizar o IMEI:', error);
            return false;
        }
    }

    static async deleteImei(id: number): Promise<boolean> {
        try {
            const path = `/imei/delete`;
            const secondsTimeout = 15;

            await ReqHttp.delete({
                path,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao deletar o IMEI:', error);
            return false;
        }
    }
}
