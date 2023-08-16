import Clientes from '@/domain/models/Clientes';
import ClientesUseCase from '@/domain/usecases/clientes_use_case';
import { useEffect, useState } from 'react';

const useClientes = () => {
    const [clientes, setClientes] = useState<Clientes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const buscarClientes = async () => {
        setLoading(true);
        setError(null);

        try {
            const listaClientes = await ClientesUseCase.buscarTodosClientes();
            setClientes(listaClientes);
        } catch (error) {
            setError('Erro ao buscar os clientes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarClientes();
    }, []);

    return { clientes, loading, error, buscarClientes };
};

export default useClientes;