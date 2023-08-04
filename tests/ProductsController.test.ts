import ProdutosController from "@/core/controllers/produtos_controller";
import Produto from "@/core/models/produtos_model";

describe('Products Controllere', () => {

    const novoProduto = {
        nome: 'Produto Novo',
        preco: 100.0,
        custo: 80.0,
        id_fornecedor: 1,
        id_moeda_custo: 1,
        id_moeda_preco: 1,
        ativo: true,
    };


    it("Should Create a New Products", async () => {

        try {
            let newProduct: Produto = await ProdutosController.createNewProduct(novoProduto);

            expect(newProduct?.nome).toBe(novoProduto.nome);

        } catch (error) {
            console.log(error);

            console.log(`Erro ao criar produto ${error}`);

        }

    });

    it("Should Update Products", async () => {

        const novoProduto = {
            id: 3,
            preco: 25.985,
        };


        try {
            let newProduct: boolean = await ProdutosController.updateProduct(novoProduto.id, novoProduto);

            expect(newProduct).toBe(true);

        } catch (error) {
            console.log(error);

            console.log(`Erro ao criar produto ${error}`);

        }

    });




})