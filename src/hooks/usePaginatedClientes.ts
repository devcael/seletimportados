import { useEffect, useState } from 'react';
import Clientes from '@/domain/models/Clientes';
import ClientesUseCase from '@/domain/usecases/clientes_use_case';
interface PaginatedData {
    data: Clientes[];
    loading: boolean;
    page: number;
    search: string;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    fetchData: (newPage: number, limit: number, newSearch: string) => void;
}

const usePaginatedClientes = (
    initialPage: number,
    limit: number
): PaginatedData => {
    const [data, setData] = useState<Clientes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(initialPage);
    const [search, setSearch] = useState<string>('');

    const fetchData = async (newPage: number, pageSize: number, newSearch: string) => {
        setLoading(true);
        try {
            const clientesList = await ClientesUseCase.buscarClientesPaginados(newPage, pageSize, newSearch);
            console.log("Search: ", clientesList);

            setData(clientesList);
            setPage(newPage);
            setSearch(newSearch);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(initialPage, limit, '');
    }, []);

    return { data, loading, fetchData, page, search, setPage, setSearch };
}

export default usePaginatedClientes;
