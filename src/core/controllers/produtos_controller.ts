import Produto from '../models/produtos_model';

const ProdutosController = {


    async getUserById(id: number): Promise<Produto | null> {
        return await Produto.findByPk(id);
    },

    async findAll() {

    },

    async buscarProdutosPaginados(page: number, pageSize: number): Promise<{ produtos: Produto[]; totalCount: number }> {

        const offset = (page - 1) * pageSize;

        const produtos = await Produto.findAll({
            offset,
            limit: pageSize,
        });

        const totalCount = await Produto.count();

        return { produtos, totalCount };

    },

    async createNewProduct(produto: {
        nome: string,
        preco: number,
        custo: number,
        id_fornecedor: number,
        id_moeda_custo: number,
        id_moeda_preco: number,
        ativo?: boolean | null | undefined,
    }): Promise<Produto> {

        return await Produto.create(produto);

    },

    async updateProduct(produtoId: number, novosDados: {
        nome?: string,
        preco?: number,
        custo?: number,
        id_fornecedor?: number,
        id_moeda_custo?: number,
        id_moeda_preco?: number,
        ativo?: boolean | null | undefined,
    }): Promise<boolean> {
        const [updatedRowsCount] = await Produto.update(novosDados, {
            where: { id: produtoId },
        });

        return updatedRowsCount > 0;
    },

    async excluirProduto(produtoId: number): Promise<boolean> {
        const deletedRowsCount = await Produto.destroy({
            where: { id: produtoId },
        });

        return deletedRowsCount > 0;

    }

}

export default ProdutosController;