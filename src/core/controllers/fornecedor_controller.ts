import FornecedorModel from '../models/fornecedor_model';
import sequelize from '../settings/database';

const FornecedoresController = {

    async getFornecedorById(id: number): Promise<FornecedorModel | null> {
        return await FornecedorModel.findByPk(id);
    },

    async findAll(): Promise<FornecedorModel[] | null> {
        return await sequelize.query('SELECT * FROM fornecedor', {
            model: FornecedorModel,
            mapToModel: true
        });
    },

    async buscarFornecedoresPaginados(currPage: number, pageSize: number, searchName: string): Promise<{ fornecedores: FornecedorModel[]; totalCount: number; currPage: number }> {
        const fornecedores = await sequelize.query(`SELECT * FROM fornecedor WHERE nome LIKE "%${searchName}%" LIMIT ${pageSize} OFFSET ${currPage};`, {
            model: FornecedorModel,
            mapToModel: true
        });

        const totalCount = await FornecedorModel.count();

        return { fornecedores, totalCount, currPage };
    },

    async createNewFornecedor(fornecedor: {
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
        pais: string | null;
        crt: string | null;
    }): Promise<FornecedorModel> {
        return await FornecedorModel.create(fornecedor);
    },

    async updateFornecedor(fornecedorId: number, novosDados: {
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
        const [updatedRowsCount] = await FornecedorModel.update(novosDados, {
            where: { id: fornecedorId },
        });

        return updatedRowsCount > 0;
    },

    async excluirFornecedor(fornecedorId: number): Promise<boolean> {
        const deletedRowsCount = await FornecedorModel.destroy({
            where: { id: fornecedorId },
        });

        return deletedRowsCount > 0;
    }

}

export default FornecedoresController;