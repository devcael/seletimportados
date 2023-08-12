import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";

class TiposDePagamentoModel extends Model {
    public idtiposdepagamento!: number;
    public tipo!: 'AP' | 'AV';
    public nome_tipo!: string;
}

TiposDePagamentoModel.init(
    {
        idtiposdepagamento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM('AP', 'AV'),
            allowNull: false,
        },
        nome_tipo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'TiposDePagamentoModel',
        tableName: 'tiposdepagamento', // Certifique-se de que o nome da tabela está correto
        timestamps: false,
    }
);

export default TiposDePagamentoModel;