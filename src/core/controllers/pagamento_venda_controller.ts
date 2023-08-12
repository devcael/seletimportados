import PagamentoVendaModel from '../models/pagamento_venda';
import sequelize from '../settings/database';

const PagamentoVendaController = {

    async getPagamentoVendaById(id: number): Promise<PagamentoVendaModel | null> {
        return await PagamentoVendaModel.findByPk(id);
    },

    async findAll(): Promise<PagamentoVendaModel[] | null> {
        return await sequelize.query('SELECT * FROM pagamento_venda', {
            model: PagamentoVendaModel,
            mapToModel: true
        });
    },
    async findAllVenda(id_venda: number): Promise<PagamentoVendaModel[] | null> {
        return await sequelize.query(`SELECT * FROM pagamento_venda WHERE  id_venda = ${id_venda}`, {
            model: PagamentoVendaModel,
            mapToModel: true
        });
    },

    async createNewPagamentoVenda(pagamentoVenda: {
        id_venda: number;
        id_tipo_pagamento: number;
        valorpago: number;
        troco: number | null;
    }): Promise<PagamentoVendaModel> {
        return await PagamentoVendaModel.create(pagamentoVenda);
    },

    async updatePagamentoVenda(idPagamentoVenda: number, novosDados: {
        id_venda?: number;
        id_tipo_pagamento?: number;
        valorpago?: number;
        troco?: number | null;
    }): Promise<boolean> {
        const [updatedRowsCount] = await PagamentoVendaModel.update(novosDados, {
            where: { idpagamento_venda: idPagamentoVenda },
        });

        return updatedRowsCount > 0;
    },

    async excluirPagamentoVenda(idPagamentoVenda: number): Promise<boolean> {
        const deletedRowsCount = await PagamentoVendaModel.destroy({
            where: { idpagamento_venda: idPagamentoVenda },
        });

        return deletedRowsCount > 0;
    }

}

export default PagamentoVendaController;





