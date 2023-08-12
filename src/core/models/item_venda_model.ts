import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";

class ItemsVenda extends Model {
    public id_itens_venda!: number;
    public id_produto!: number;
    public nome_produto!: string;
    public preco_produto!: number;
    public custo_produto!: number;
    public quantidade!: number;
    public acrescimo!: number | null;
    public desconto!: number | null;
    public valortotal!: number;
    public id_moeda_custo_produto!: number;
    public taxa_moeda_custo_produto!: number;
    public id_moeda_preco_produto!: number;
    public taxa_moeda_preco_produto!: number;
    public id_venda!: number;
}

ItemsVenda.init(
    {
        id_itens_venda: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_produto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nome_produto: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        preco_produto: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        custo_produto: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        acrescimo: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        desconto: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        valortotal: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        id_moeda_custo_produto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        taxa_moeda_custo_produto: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        id_moeda_preco_produto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        taxa_moeda_preco_produto: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        id_venda: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ItemsVenda',
        tableName: 'items_venda',
        timestamps: false,
    }
);

export default ItemsVenda;
