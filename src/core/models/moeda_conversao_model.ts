import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";

class MoedaConversaoModel extends Model {
    public id_taxa!: number;
    public nome_da_moeda!: string;
    public taxa_de_conversao_real!: number;
    public simbolo!: string;
}


MoedaConversaoModel.init(
    {
        id_taxa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome_da_moeda: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taxa_de_conversao_real: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        simbolo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
    sequelize,
    tableName: 'moedasconversao',
    timestamps: false,
});

export default MoedaConversaoModel;