import Fornecedor from '../models/Fornecedor';
import ReqHttp from '../services/ReqHttp';

export default class FornecedorUseCase {
    static async criarNovoFornecedor(fornecedor: Fornecedor): Promise<boolean> {
        try {
            const { body } = await ReqHttp.post({
                path: '/fornecedor/create',
                secondsTimeout: 10,
                body: fornecedor.toJson({ sendId: false }),
            });

            return body.success === true;
        } catch (error) {
            console.error('Erro ao criar o fornecedor:', error);
            return false;
        }
    }

    static async buscarTodosFornecedores(): Promise<Fornecedor[]> {
        try {
            const { body } = await ReqHttp.get({
                path: '/fornecedor/fornecedores',
                secondsTimeout: 90
            });

            const listaFornecedores: Fornecedor[] = body;

            return listaFornecedores;
        } catch (error) {
            console.error('Erro ao buscar todos os fornecedores:', error);
            throw error;
        }
    }

    static async deleteFornecedor(id: number): Promise<boolean> {
        try {
            const path = `/fornecedor/delete`;
            const secondsTimeout = 15;

            await ReqHttp.delete({
                path,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao deletar o fornecedor:', error);
            return false;
        }
    }

    static async getFornecedorById(id: number): Promise<Fornecedor | null> {
        try {
            const path = `/fornecedor/get-by-id`;
            const secondsTimeout = 15;

            const { body } = await ReqHttp.get({
                path,
                secondsTimeout,
                queryParams: { id },
            });

            if (body) {
                const fornecedor = Fornecedor.fromJson(body);
                return fornecedor;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar o fornecedor:', error);
            throw error;
        }
    }

    static async updateFornecedor(id: number, fornecedor: {
        nome?: string;
        cpfcnpj?: string | null;
        telefone?: string | null;
        email?: string | null;
        tipo?: 'PF' | 'PJ' | null;
        endereco?: string | null;
        cep?: string | null;
        numero?: string | null;
        complemento?: string | null;
        cidade?: string | null;
        estado?: string | null;
        pais?: string | null;
        crt?: string | null;
    }): Promise<boolean> {
        try {
            const path = `/fornecedor/update`;
            const secondsTimeout = 15;

            await ReqHttp.put({
                path,
                body: fornecedor,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao atualizar o fornecedor:', error);
            return false;
        }
    }

    static async buscarFornecedoresPaginados(page: number, pageSize: number, search: string): Promise<Fornecedor[]> {
        try {
            const queryParams = {
                page,
                pageSize,
                search
            };

            const { body } = await ReqHttp.get({
                path: '/fornecedor/page',
                queryParams,
                secondsTimeout: 60
            });

            const listaFornecedores: Fornecedor[] = body.fornecedores;

            return listaFornecedores;
        } catch (error) {
            console.error('Erro ao buscar fornecedores paginados:', error);
            throw error;
        }
    }
}
