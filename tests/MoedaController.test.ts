import MoedaConversaoModel from '../src/core/models/moeda_conversao_model';
import Moeda from '../src/core/controllers/moeda_conversao_controller';
import MoedaConversaoController from '../src/core/controllers/moeda_conversao_controller';


describe('MoedaConversaoController', () => {
    it('should return a MoedaConversaoModel object', async () => {
        var moeda: MoedaConversaoModel | null = await MoedaConversaoController.getMoedaConversao(1);
        expect(moeda).toBeInstanceOf(MoedaConversaoModel);
    });


    it('should return all MoedaConversaoModel objects', async () => {
        var moedas: MoedaConversaoModel[] = await MoedaConversaoController.getAllMoedaConversao();
        expect(moedas).toBeInstanceOf(Array);
    });
});