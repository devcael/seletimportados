import EmpresaModel from '../models/empresa_model';
import sequelize from '../settings/database';

const EmpresaController = {

    async getCadEmpresaById(id: number): Promise<EmpresaModel | null> {
        return await EmpresaModel.findByPk(id);
    },
    async updateEmpresa(empresaId: number, novosDados: {
        nome?: string;
        cpfcnpj?: string | null;
        telefone?: string | null;
        email?: string | null;
        tipo?: 'PF' | 'PJ' | null;
        endereco?: string | null;
        cep?: string | null;
        numero?: string | null;
        complemento?: string | null;
        cidade?: string | null;
        estado?: string | null;
        pais?: string | null;
        crt?: string | null;
    }): Promise<boolean> {
        const [updatedRowsCount] = await EmpresaModel.update(novosDados, {
            where: { id: empresaId },
        });

        return updatedRowsCount > 0;
    }
}

export default EmpresaController;