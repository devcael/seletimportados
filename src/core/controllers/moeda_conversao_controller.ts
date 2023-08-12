import MoedaConversaoModel from "../models/moeda_conversao_model";
import sequelize from '../settings/database';
const MoedaConversaoController = {
    async getMoedaConversao(codigo: number): Promise<MoedaConversaoModel | null> {
        return MoedaConversaoModel.findByPk(codigo);;
    },

    async getAllMoedaConversao(): Promise<MoedaConversaoModel[]> {
        return MoedaConversaoModel.findAll();
    },
    async getDolar(): Promise<MoedaConversaoModel[] | null> {
        return await await sequelize.query('SELECT * FROM moedasconversao WHERE nome_da_moeda LIKE "DOLAR" LIMIT 1;', {
            model: MoedaConversaoModel,
            mapToModel: true
        });
    },
    async createNewMoedaConversao(moedaConversao: {
        nome_da_moeda: string;
        taxa_de_conversao_real: number;
        simbolo: string;
    }): Promise<MoedaConversaoModel> {
        return await MoedaConversaoModel.create(moedaConversao);
    },

    async updateMoedaConversao(moedaConversaoId: number, novosDados: {
        nome_da_moeda?: string;
        taxa_de_conversao_real?: number;
        simbolo?: string;
    }): Promise<boolean> {
        const [updatedRowsCount] = await MoedaConversaoModel.update(novosDados, {
            where: { id_taxa: moedaConversaoId },
        });

        return updatedRowsCount > 0;
    },

    async excluirMoedaConversao(moedaConversaoId: number): Promise<boolean> {
        const deletedRowsCount = await MoedaConversaoModel.destroy({
            where: { id_taxa: moedaConversaoId },
        });

        return deletedRowsCount > 0;
    }
}

export default MoedaConversaoController;