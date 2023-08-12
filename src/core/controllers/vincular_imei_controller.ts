import VincularIMEIModel from '../models/vincular_imei_model';
import sequelize from '../settings/database';

const VincularIMEIController = {

    async getVincularIMEIById(id: number): Promise<VincularIMEIModel | null> {
        return await VincularIMEIModel.findByPk(id);
    },

    async findAll(): Promise<VincularIMEIModel[] | null> {
        return await sequelize.query('SELECT * FROM vincular_imei', {
            model: VincularIMEIModel,
            mapToModel: true
        });
    },

    async findAllVenda(id_itemvenda: number): Promise<VincularIMEIModel[] | null> {
        return await sequelize.query(`SELECT * FROM vincular_imei WHERE id_itemvenda = ${id_itemvenda}`, {
            model: VincularIMEIModel,
            mapToModel: true
        });
    },

    async createNewVincularIMEI(vincularIMEI: {
        id_itemvenda: number;
        numeroimei: string;
    }): Promise<VincularIMEIModel> {
        return await VincularIMEIModel.create(vincularIMEI);
    },

    async updateVincularIMEI(idVincularIMEI: number, novosDados: {
        id_itemvenda?: number;
        numeroimei?: string;
    }): Promise<boolean> {
        const [updatedRowsCount] = await VincularIMEIModel.update(novosDados, {
            where: { id_imei: idVincularIMEI },
        });

        return updatedRowsCount > 0;
    },

    async excluirVincularIMEI(idVincularIMEI: number): Promise<boolean> {
        const deletedRowsCount = await VincularIMEIModel.destroy({
            where: { id_imei: idVincularIMEI },
        });

        return deletedRowsCount > 0;
    }

}

export default VincularIMEIController;