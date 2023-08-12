import MoedaConversaoModel from "../models/moeda_conversao_model";

const MoedaConversaoController = {
    async getMoedaConversao(codigo: number): Promise<MoedaConversaoModel | null> {
        return MoedaConversaoModel.findByPk(codigo);;
    },

    async getAllMoedaConversao(): Promise<MoedaConversaoModel[]> {
        return MoedaConversaoModel.findAll();
    }
}

export default MoedaConversaoController;