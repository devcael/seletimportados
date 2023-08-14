import Clientes from "@/domain/models/Clientes";
import ClientesUseCase from "@/domain/usecases/clientes_use_case";

describe('ClientesUseCase', () => {
    // ... outros testes ...

    it('deve buscar todos os clientes', async () => {
        const listaClientes = await ClientesUseCase.buscarTodosClientes();

        console.log(listaClientes);



    });

    /*     it('deve criar um novo cliente', async () => {
            const novoCliente = new Clientes(
                1,
                'João da Silva3',
                '123.456.789-00',
                '(11) 98765-4321',
                'joao@example.com',
                'PF',
                'Rua das Flores',
                '12345-678',
                '123',
                'Apto 101',
                'São Paulo',
                'SP'
            );
    
            const resultado = await ClientesUseCase.criarNovoCliente(novoCliente);
            console.log(resultado);
    
    
        }); */


    it('deve buscar clientes paginados com filtro de pesquisa', async () => {
        const page = 0;
        const pageSize = 1;
        const search = 'Jo';

        const listaClientes = await ClientesUseCase.buscarClientesPaginados(page, pageSize, search);


        console.log(listaClientes);


        // expect(Array.isArray(listaClientes)).toBe(true);
        // expect(listaClientes.length).toBeGreaterThan(0);
    });
});