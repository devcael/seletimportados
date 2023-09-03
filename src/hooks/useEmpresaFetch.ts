import Empresa from '@/domain/models/Empresa';
import EmpresaUseCase from '@/domain/usecases/empresa_use_case';
import { useState, useCallback, use, useEffect } from 'react';

export function useEmpresa() {
    const [empresa, setEmpresa] = useState<Empresa | null>(null);
    const [loading, setLoading] = useState(false);

    const getEmpresa = useCallback(async () => {
        setLoading(true);
        try {
            const empresaData = await EmpresaUseCase.getEmpresa();
            setEmpresa(empresaData);
        } catch (error) {
            console.error('Erro ao buscar empresa:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateEmpresa = async (currEmpresa: {
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
    }) => {
        try {

            console.log("Updating empresa:", currEmpresa);

            await EmpresaUseCase.updateEmpresa(currEmpresa);
            //await getEmpresa();
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
        }
    };



    useEffect(() => {
        getEmpresa();
    }, []);

    return {
        empresa,
        loading,
        getEmpresa,
        updateEmpresa,
    };
}
