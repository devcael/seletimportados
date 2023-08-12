import TiposDePagamentoModel from '../models/tipos_de_pagamento_model';
import sequelize from '../settings/database';

const TiposDePagamentoController = {

    async getTipoDePagamentoById(id: number): Promise<TiposDePagamentoModel | null> {
        return await TiposDePagamentoModel.findByPk(id);
    },

    async findAll(): Promise<TiposDePagamentoModel[] | null> {
        return await sequelize.query('SELECT * FROM tiposdepagamento', {
            model: TiposDePagamentoModel,
            mapToModel: true
        });
    },

    async createNewTipoDePagamento(tipoDePagamento: {
        tipo: 'AP' | 'AV';
        nome_tipo: string;
    }): Promise<TiposDePagamentoModel> {
        return await TiposDePagamentoModel.create(tipoDePagamento);
    },

    async updateTipoDePagamento(idTipoDePagamento: number, novosDados: {
        tipo?: 'AP' | 'AV';
        nome_tipo?: string;
    }): Promise<boolean> {
        const [updatedRowsCount] = await TiposDePagamentoModel.update(novosDados, {
            where: { idtiposdepagamento: idTipoDePagamento },
        });

        return updatedRowsCount > 0;
    },

    async excluirTipoDePagamento(idTipoDePagamento: number): Promise<boolean> {
        const deletedRowsCount = await TiposDePagamentoModel.destroy({
            where: { idtiposdepagamento: idTipoDePagamento },
        });

        return deletedRowsCount > 0;
    }

}

export default TiposDePagamentoController;