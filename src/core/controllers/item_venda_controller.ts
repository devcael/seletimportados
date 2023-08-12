import ItemsVendaModel from '../models/item_venda_model';
import sequelize from '../settings/database';

const ItemsVendaController = {

    async getItemsVendaById(id: number): Promise<ItemsVendaModel | null> {
        return await ItemsVendaModel.findByPk(id);
    },

    async findAll(): Promise<ItemsVendaModel[] | null> {
        return await sequelize.query('SELECT * FROM items_venda', {
            model: ItemsVendaModel,
            mapToModel: true
        });
    },

    async findAllByIdVenda(id_venda: number): Promise<ItemsVendaModel[] | null> {
        return await sequelize.query(`SELECT * FROM items_venda WHERE id_venda = ${id_venda}`, {
            model: ItemsVendaModel,
            mapToModel: true,

        });
    },

    async createNewItemVenda(itemVenda: {
        id_produto: number;
        nome_produto: string;
        preco_produto: number;
        custo_produto: number;
        quantidade: number;
        acrescimo: number | null;
        desconto: number | null;
        valortotal: number;
        id_moeda_custo_produto: number;
        taxa_moeda_custo_produto: number;
        id_moeda_preco_produto: number;
        taxa_moeda_preco_produto: number;
        id_venda: number;
    }): Promise<ItemsVendaModel> {
        return await ItemsVendaModel.create(itemVenda);
    },

    async updateItemVenda(itemVendaId: number, novosDados: {
        id_produto?: number;
        nome_produto?: string;
        preco_produto?: number;
        custo_produto?: number;
        quantidade?: number;
        acrescimo?: number | null;
        desconto?: number | null;
        valortotal?: number;
        id_moeda_custo_produto?: number;
        taxa_moeda_custo_produto?: number;
        id_moeda_preco_produto?: number;
        taxa_moeda_preco_produto?: number;
        id_venda?: number;
    }): Promise<boolean> {
        const [updatedRowsCount] = await ItemsVendaModel.update(novosDados, {
            where: { id_itens_venda: itemVendaId },
        });

        return updatedRowsCount > 0;
    },

    async excluirItemVenda(itemVendaId: number): Promise<boolean> {
        const deletedRowsCount = await ItemsVendaModel.destroy({
            where: { id_itens_venda: itemVendaId },
        });

        return deletedRowsCount > 0;
    }

}

export default ItemsVendaController;