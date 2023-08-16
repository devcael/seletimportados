import { useEffect, useState } from 'react';
import CabecalhoVenda from '@/domain/models/CabecalhoVenda';
import VendaUseCase from '@/domain/usecases/venda_usecase';
import { QueryParamsPagination } from '@/types/QueryParamsPagination';

interface PaginatedData {
    data: CabecalhoVenda[];
    loading: boolean;
    page: number;
    search: string;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    fetchData: (newPage: number, limit: number, newSearch: string) => void;
}

const usePaginatedDataVenda = (
    initialPage: number,
    limit: number
): PaginatedData => {
    const [data, setData] = useState<CabecalhoVenda[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(initialPage);
    const [search, setSearch] = useState<string>('');

    const fetchData = async (newPage: number, limit: number, newSearch: string, queryParamsPag?: QueryParamsPagination) => {
        setLoading(true);
        try {
            const queryParams: QueryParamsPagination = {
                currPage: newPage,
                pageSize: limit,
                search: newSearch,
                ...queryParamsPag ?? {}
            };

            const cabecalhos: CabecalhoVenda[] = await VendaUseCase.getCabecalhosPaginados({ queryParams });
            setData(cabecalhos);
            setPage(newPage);
            setSearch(newSearch);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(initialPage, 10, '');
    }, []);

    return { data, loading, fetchData, page, search, setPage, setSearch };
};

export default usePaginatedDataVenda;

