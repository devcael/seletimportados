import Clientes from '../models/Clientes';
import ReqHttp from '../services/ReqHttp';

export default class ClientesUseCase {
    static async criarNovoCliente(cliente: Clientes): Promise<boolean> {
        try {
            const { body } = await ReqHttp.post({
                path: '/clientes/clientes',
                secondsTimeout: 10,
                body: cliente.toJson({ sendId: false }),
            });

            return body.success === true;
        } catch (error) {
            console.error('Erro ao criar o cliente:', error);
            return false;
        }
    }

    static async buscarTodosClientes(): Promise<Clientes[]> {
        try {
            const { body } = await ReqHttp.get({
                path: '/clientes/clientes',
                secondsTimeout: 10
            });

            const listaClientes: Clientes[] = body;

            return listaClientes;
        } catch (error) {
            console.error('Erro ao buscar todos os clientes:', error);
            throw error;
        }
    }

    static async deleteCliente(id: number): Promise<boolean> {
        try {
            const path = `/clientes/delete`;
            const secondsTimeout = 15;

            await ReqHttp.delete({
                path,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao deletar o cliente:', error);
            return false;
        }
    }

    static async getClienteById(id: number): Promise<Clientes | null> {
        try {
            const path = `/clientes/get-by-id`;
            const secondsTimeout = 15;

            const { body } = await ReqHttp.get({
                path,
                secondsTimeout,
                queryParams: { id },
            });

            if (body) {
                const cliente = Clientes.fromJson(body);
                return cliente;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar o cliente:', error);
            throw error;
        }
    }

    static async updateCliente(id: number, cliente: {

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
    }): Promise<boolean> {
        try {
            const path = `/clientes/update`;
            const secondsTimeout = 15;

            await ReqHttp.put({
                path,
                body: cliente,
                secondsTimeout,
                queryParams: { id },
            });

            return true;
        } catch (error) {
            console.error('Erro ao atualizar o cliente:', error);
            return false;
        }
    }

    static async buscarClientesPaginados(page: number, pageSize: number, search: string): Promise<Clientes[]> {
        try {
            const queryParams = {
                page,
                pageSize,
                search
            };

            const { body } = await ReqHttp.get({
                path: '/clientes/page',
                queryParams,
                secondsTimeout: 10
            });

            const listaClientes: Clientes[] = body.clientes;

            return listaClientes;
        } catch (error) {
            console.error('Erro ao buscar clientes paginados:', error);
            throw error;
        }
    }
}
