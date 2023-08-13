import CabecalhoVenda from "@/domain/models/CabecalhoVenda";
import VendaUseCase from "@/domain/usecases/venda_usecase";
import { QueryParamsPagination } from "@/types/QueryParamsPagination";

describe('Venda Use Case', () => {
    it('Should List All Vendas Paginadas', async () => {

        const queryParams: QueryParamsPagination = {
            currPage: 0,
            pageSize: 10,
            search: '',
            tipo: 'VENDA',
            situacao: 'ABERTA',
        };

        const listOfCabecalhoVendas = await VendaUseCase.getCabecalhosPaginados({ queryParams: queryParams });

        for (let index = 0; index < listOfCabecalhoVendas.length; index++) {
            const element = listOfCabecalhoVendas[index];

            console.log(element);


        }

    })

    it('Should Create a NewSale', async () => {
        const novoCabecalho = new CabecalhoVenda(
            5,
            '2023-08-11',
            '14:30:00',
            '101',
            'FINALIZADA',
            10,
            2,
            '10',
            '5',
            '106',
            '111',
            'VENDA',
            'João da Silva'
        );

        await VendaUseCase.createVenda(novoCabecalho);
    })

    it('Should Update a Sale', async () => {
        await VendaUseCase.updateVenda(5, { situacao: 'ABERTA' })
    })
    it('Should Delete a Sale', async () => {
        await VendaUseCase.deleteVenda(5)
    })
})