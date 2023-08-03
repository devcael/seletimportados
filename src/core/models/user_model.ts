import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";


class User extends Model {
    public idusuario!: number;
    public nome!: string;
    public senha!: string;
}

User.init(
    {
        idusuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'usuario',
        timestamps: false,
    }
);

export default User;

