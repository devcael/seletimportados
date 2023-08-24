import Empresa from '../models/Empresa';
import Fornecedor from '../models/Fornecedor';
import ReqHttp from '../services/ReqHttp';

export default class EmpresaUseCase {
    static async getEmpresa(): Promise<Empresa | null> {
        try {
            const path = `/empresa/empresa`;
            const secondsTimeout = 15;

            const { body } = await ReqHttp.get({
                path,
                secondsTimeout,
            });

            if (body) {
                const empresa = Empresa.fromJSON(body);
                return empresa;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar o fornecedor:', error);
            throw error;
        }
    }

    static async updateEmpresa(empresa: {
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
        try {
            const path = `/empresa/empresa`;
            const secondsTimeout = 15;

            await ReqHttp.put({
                path,
                body: empresa,
                secondsTimeout,
            });

            return true;
        } catch (error) {
            console.error('Erro ao atualizar o empresa:', error);
            return false;
        }
    }

}
