import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";

type ProdutoAttributes = {
    id: number;
    nome: string;
    ean: string | null;
    preco: number;
    custo: number;
    id_fornecedor: number;
    id_moeda_custo: number;
    id_moeda_preco: number;
    ativo: boolean | null;
};


class ProdutoModel extends Model {
    public id!: number;
    public nome!: string;
    public ean!: string | null;
    public preco!: number;
    public custo!: number;
    public id_fornecedor!: number;
    public id_moeda_custo!: number;
    public id_moeda_preco!: number;
    public ativo!: number | null;
    public data_de_cadastro!: Date | null;
    public estoque!: number | null;
    public marca!: string | null;

}

ProdutoModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ean: {
            type: DataTypes.STRING(25),
            allowNull: true,
            defaultValue: null,
        },
        preco: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        custo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        id_fornecedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_moeda_custo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_moeda_preco: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ativo: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: null,
        },
        data_de_cadastro: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        estoque: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        marca: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },

    },
    {
        sequelize,
        modelName: 'ProdutoModel',
        tableName: 'produtos',
        timestamps: false
    }
);

export default ProdutoModel;