import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/database";

class PagamentoVendaModel extends Model {
    public idpagamento_venda!: number;
    public id_venda!: number;
    public id_tipo_pagamento!: number;
    public valorpago!: number;
    public troco!: number | null;


}

PagamentoVendaModel.init(
    {
        idpagamento_venda: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_venda: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_tipo_pagamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valorpago: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        troco: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'PagamentoVendaModel',
        tableName: 'pagamento_venda',
        timestamps: false,
    }
);

export default PagamentoVendaModel;