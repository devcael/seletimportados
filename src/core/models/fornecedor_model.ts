import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";


class FornecedorModel extends Model {
    public id!: number;
    public nome!: string;
    public cpfcnpj!: string | null;
    public telefone!: string | null;
    public email!: string | null;
    public tipo!: 'PF' | 'PJ' | null;
    public endereco!: string | null;
    public cep!: string | null;
    public numero!: string | null;
    public complemento!: string | null;
    public cidade!: string | null;
    public estado!: string | null;
    public pais!: string | null;
    public crt!: string | null;


}

FornecedorModel.init(
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
        cpfcnpj: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: null,
        },
        telefone: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: null,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        tipo: {
            type: DataTypes.ENUM('PF', 'PJ'),
            allowNull: true,
            defaultValue: null,
        },
        endereco: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null,
        },
        cep: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null,
        },
        numero: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: null,
        },
        complemento: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        cidade: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null,
        },
        estado: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null,
        },
        pais: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: null,
        },
        crt: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        tableName: 'fornecedor',
        timestamps: false,
    }
);

export default FornecedorModel;