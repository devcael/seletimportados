import MoedaConversao from "@/domain/models/MoedaConversao";
import Produto from "@/domain/models/Produto";
import Fornecedor from "@/domain/models/Fornecedor";
import ProdutoUseCase from "@/domain/usecases/produto_usecase";
import { describe } from "node:test";

describe(() => {


    it('Should Get One Product', async () => {
        let produto: Produto = await ProdutoUseCase.getById(1);
        console.log(produto);

    })

    /*  it("Shold Create New Product", async () => {
 
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
 
         const novoProduto = new Produto(
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
 
         await ProdutoUseCase.enviarProduto(novoProduto);
 
 
 
     })
 
     it('Should Delete Product', async () => {
 
         await ProdutoUseCase.deletearProduto(4);
 
     });
 
     it('Shoud Update Product', async () => {
 
         let updateParams = {
 
             ean: "698.985213"
         }
 
         await ProdutoUseCase.updateProduto(4, updateParams);
 
 
     });
  */


})