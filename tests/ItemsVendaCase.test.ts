import Fornecedor from "@/domain/models/Fornecedor";
import ItemVenda from "@/domain/models/ItemVenda";
import MoedaConversao from "@/domain/models/MoedaConversao";
import Produto from "@/domain/models/Produto";
import ItemVendaUseCase from "@/domain/usecases/items_venda_usecase";

describe("Teste UseCase Itens Venda", () => {

    /*   it("Should Get OneItemVenda", async () => {
          await ItemVendaUseCase.getAllByIdVenda(1);
      });
  
      it('Should Create a New Item Venda', async () => {
  
          const novaMoedaCusto: MoedaConversao = new MoedaConversao(1, 'Dólar', 5.2, '$');
          const novaMoedaPreco: MoedaConversao = new MoedaConversao(1, 'Euro', 6.0, '€');
          const novoFornecedor: Fornecedor = new Fornecedor(
              1,
              'Fornecedor XYZ',
              '12345678900',
              '1234567890',
              'fornecedor@example.com',
              'PJ',
              'Rua das Empresas',
              '12345-678',
              '123',
              'Sala 101',
              'Cidade A',
              'Estado X',
              'País Z',
              'CRT123'
          );
  
          const produtoParaItemVenda = new Produto(
              1,
              'Produto Novo',
              '123456789',
              100,
              80,
              novoFornecedor,
              novaMoedaCusto,
              novaMoedaPreco,
              120,
              90,
              true,
              new Date(),
              50,
              'Marca A'
          );
          // Criando uma nova instância de ItemVenda
          const novoItemVenda = new ItemVenda(
              1,
              produtoParaItemVenda.id,
              produtoParaItemVenda.nome,
              produtoParaItemVenda.preco,
              produtoParaItemVenda.custo,
              3,
              null,
              null,
              produtoParaItemVenda,
              null,
              450,
              produtoParaItemVenda.moeda_custo.id_taxa,
              produtoParaItemVenda.moeda_custo.taxa_de_conversao_real,
              produtoParaItemVenda.moeda_preco.id_taxa,
              produtoParaItemVenda.moeda_preco.taxa_de_conversao_real,
              1
          );
  
          console.log(novoItemVenda.toJson({ sendId: false }));
  
  
          await ItemVendaUseCase.enviarItemVenda(novoItemVenda);
  
      }) */

    it('Should Update a ItemVenda', async () => {
        await ItemVendaUseCase.updateItemVenda(2, { quantidade: 303 });
    })

});
