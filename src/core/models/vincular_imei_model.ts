import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";

class VincularIMEIModel extends Model {
    public id_imei!: number;
    public id_itemvenda!: number;
    public numeroimei!: string;


}

VincularIMEIModel.init(
    {
        id_imei: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_itemvenda: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        numeroimei: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'VincularIMEIModel',
        tableName: 'vincular_imei',
        timestamps: false,
    }
);

export default VincularIMEIModel;





