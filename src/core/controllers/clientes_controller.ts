import ClienteModel from '../models/clientes_model';
import sequelize from '../settings/database';

const ClientesController = {

    async getClienteById(id: number): Promise<ClienteModel | null> {
        return await ClienteModel.findByPk(id);
    },

    async findAll(): Promise<ClienteModel[] | null> {
        return await sequelize.query('SELECT * FROM clientes', {
            model: ClienteModel,
            mapToModel: true
        });
    },

    async buscarClientesPaginados(currPage: number, pageSize: number, searchName: string): Promise<{ clientes: ClienteModel[]; totalCount: number; currPage: number }> {

        let offset = currPage * pageSize;

        const clientes = await sequelize.query(`SELECT * FROM clientes WHERE nome LIKE "%${searchName}%" LIMIT ${pageSize} OFFSET ${offset};`, {
            model: ClienteModel,
            mapToModel: true
        });

        const totalCount = await ClienteModel.count();

        return { clientes, totalCount, currPage };
    },

    async createNewCliente(cliente: {
        nome: string;
        cpfcnpj: string | null;
        telefone: string | null;
        email: string | null;
        tipo: 'PF' | 'PJ' | null;
        endereco: string | null;
        cep: string | null;
        numero: string | null;
        complemento: string | null;
        cidade: string | null;
        estado: string | null;
    }): Promise<ClienteModel> {
        return await ClienteModel.create(cliente);
    },

    async updateCliente(clienteId: number, novosDados: {
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
        const [updatedRowsCount] = await ClienteModel.update(novosDados, {
            where: { id: clienteId },
        });

        return updatedRowsCount > 0;
    },

    async excluirCliente(clienteId: number): Promise<boolean> {
        const deletedRowsCount = await ClienteModel.destroy({
            where: { id: clienteId },
        });

        return deletedRowsCount > 0;
    }

}

export default ClientesController;