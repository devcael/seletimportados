import ProdutoModel from '../models/produtos_model';
import sequelize from '../settings/database';

const ProdutosController = {


    async getUserById(id: number): Promise<ProdutoModel | null> {
        return await ProdutoModel.findByPk(id);
    },

    async findAll(): Promise<ProdutoModel[] | null> {
        return await await sequelize.query('SELECT * FROM produtos WHERE nome LIKE "%Mi%"', {
            model: ProdutoModel,
            mapToModel: true // pass true here if you have any mapped fields
        });

    },

    async buscarProdutosPaginados(currPage: number, pageSize: number, searchName: string): Promise<{ produtos: ProdutoModel[]; totalCount: number, currPage: number }> {

        const produtos = await sequelize.query(`SELECT * FROM produtos WHERE nome LIKE "%${searchName}%" LIMIT ${pageSize} OFFSET ${currPage};`, {
            model: ProdutoModel,
            mapToModel: true // pass true here if you have any mapped fields
        });

        const totalCount = await ProdutoModel.count();

        return { produtos, totalCount, currPage };

    },

    async createNewProduct(produto: {
        nome: string;
        ean: string | null;
        preco: number;
        custo: number;
        id_fornecedor: number;
        id_moeda_custo: number;
        id_moeda_preco: number;
        ativo: number | null;
        data_de_cadastro: Date | null;
        estoque: number | null;
        marca: string | null;
    }): Promise<ProdutoModel> {

        return await ProdutoModel.create(produto);

    },

    async updateProduct(produtoId: number, novosDados: {
        nome?: string;
        ean?: string | null;
        preco?: number;
        custo?: number;
        id_fornecedor?: number;
        id_moeda_custo?: number;
        id_moeda_preco?: number;
        ativo?: number | null;
        data_de_cadastro?: Date | null;
        estoque?: number | null;
        marca?: string | null;
    }): Promise<boolean> {
        const [updatedRowsCount] = await ProdutoModel.update(novosDados, {
            where: { id: produtoId },
        });

        return updatedRowsCount > 0;
    },

    async excluirProduto(produtoId: number): Promise<boolean> {
        const deletedRowsCount = await ProdutoModel.destroy({
            where: { id: produtoId },
        });

        return deletedRowsCount > 0;

    }

}

export default ProdutosController;