import VendaModel from '../models/venda_model';
import sequelize from '../settings/database';

const VendaController = {

    async getVendaById(id: number): Promise<VendaModel | null> {
        return await VendaModel.findByPk(id);
    },

    async findAll(): Promise<VendaModel[] | null> {
        return await sequelize.query('SELECT * FROM venda', {
            model: VendaModel,
            mapToModel: true
        });
    },

    async buscarVendasPaginadas(currPage: number, pageSize: number): Promise<{ vendas: VendaModel[]; totalCount: number, currPage: number }> {
        const vendas = await sequelize.query(`SELECT * FROM venda LIMIT ${pageSize} OFFSET ${currPage};`, {
            model: VendaModel,
            mapToModel: true
        });

        const totalCount = await VendaModel.count();

        return { vendas, totalCount, currPage };
    },

    async createNewVenda(venda: {
        data: Date;
        hora: string;
        totalvenda: number;
        situacao: string | null;
        id_usuario: number;
        id_cliente: number;
        desconto: number | null;
        acrescimo: number | null;
        subtotal: number;
        totalcomdescontoeacrescimo: number | null;
    }): Promise<VendaModel> {
        return await VendaModel.create(venda);
    },

    async updateVenda(vendaId: number, novosDados: {
        data?: Date;
        hora?: string;
        totalvenda?: number;
        situacao?: string | null;
        id_usuario?: number;
        id_cliente?: number;
        desconto?: number | null;
        acrescimo?: number | null;
        subtotal?: number;
        totalcomdescontoeacrescimo?: number | null;
    }): Promise<boolean> {
        const [updatedRowsCount] = await VendaModel.update(novosDados, {
            where: { id: vendaId },
        });

        return updatedRowsCount > 0;
    },

    async excluirVenda(vendaId: number): Promise<boolean> {
        const deletedRowsCount = await VendaModel.destroy({
            where: { id: vendaId },
        });

        return deletedRowsCount > 0;
    }

}

export default VendaController;