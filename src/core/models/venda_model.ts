import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";

class VendaModel extends Model {
    public id!: number;
    public data!: Date;
    public hora!: string;
    public totalvenda!: number;
    public situacao!: 'ABERTA' | 'PENDENTE' | 'FINALIZADA' | null;
    public id_usuario!: number;
    public id_cliente!: number;
    public desconto!: number | null;
    public acrescimo!: number | null;
    public subtotal!: number;
    public totalcomdescontoeacrescimo!: number | null;
    public tipo!: 'VENDA' | 'ORCAMENTO' | null;
    public nome!: string;
}

VendaModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        totalvenda: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        situacao: {
            type: DataTypes.ENUM('ABERTA', 'PENDENTE', 'FINALIZADA'),
            allowNull: true,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        desconto: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        acrescimo: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        totalcomdescontoeacrescimo: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        tipo: {
            type: DataTypes.ENUM('VENDA', 'ORCAMENTO'),
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'VendaModel',
        tableName: 'venda',
        timestamps: false,
    }
);

export default VendaModel;
