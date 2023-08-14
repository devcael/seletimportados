import MoedaConversao from '@/domain/models/MoedaConversao';
import ReqHttp from '@/domain/services/ReqHttp';
import MoedaConversaoUseCase from '@/domain/usecases/moedas_conversao_usecase';
import { IsArray } from 'sequelize-typescript';


describe('MoedaConversaoUseCase', () => {
    test('getAllMoedas retrieves and parses moedas correctly', async () => {
        const mockResponse = [
            {
                id_taxa: 1,
                nome_da_moeda: 'DOLAR',
                taxa_de_conversao_real: '10',
                simbolo: '$',
            },
            {
                id_taxa: 3,
                nome_da_moeda: 'Euro',
                taxa_de_conversao_real: '1',
                simbolo: '€',
            },
        ];



        const moedas = await MoedaConversaoUseCase.getAllMoedas();

        console.log(moedas);


        expect(moedas).toBeInstanceOf(Array);
    });
});
