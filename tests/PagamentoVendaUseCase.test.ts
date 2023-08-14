import PagamentoVendaUseCase from "@/domain/usecases/PagamentoVenda_usecase"

describe('first', () => {
    it('first', async () => {
        let list = await PagamentoVendaUseCase.getAllPagamentoVenda();

        console.log(list);

    })
})