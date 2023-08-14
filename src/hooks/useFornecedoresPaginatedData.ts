import { useEffect, useState } from 'react';
import Fornecedor from '@/domain/models/Fornecedor';
import FornecedorUseCase from '@/domain/usecases/fornecedores_use_case';

interface PaginatedData {
    data: Fornecedor[];
    loading: boolean;
    page: number;
    search: string;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    fetchData: (newPage: number, limit: number, newSearch: string) => void;
}

const useFornecedoresPaginatedData = (
    initialPage: number,
    limit: number
): PaginatedData => {
    const [data, setData] = useState<Fornecedor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(initialPage);
    const [search, setSearch] = useState<string>('');

    const fetchData = async (newPage: number, limit: number, newSearch: string) => {
        setLoading(true);
        try {
            const fornecedorList = await FornecedorUseCase.buscarFornecedoresPaginados(newPage, limit, newSearch);
            setData(fornecedorList);
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

export default useFornecedoresPaginatedData;
