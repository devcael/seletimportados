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


class Produto extends Model {
    public id!: number;
    public nome!: string;
    public ean?: string | null;
    public preco!: number;
    public custo!: number;
    public id_fornecedor!: number;
    public id_moeda_custo!: number;
    public id_moeda_preco!: number;
    public ativo?: boolean | null;

}

Produto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ean: {
            type: DataTypes.STRING,
            allowNull: true,
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
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Produto',
        tableName: 'produtos',
        timestamps: false
    }
);

export default Produto;