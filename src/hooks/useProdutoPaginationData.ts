import { useEffect, useState } from 'react';
import ProdutoUseCase from '@/domain/usecases/produto_usecase';
import Produto from '@/domain/models/Produto';

interface PaginatedData {
    data: Produto[];
    loading: boolean;
    page: number;
    search: string;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    fetchData: (newPage: number, limit: number, newSearch: string) => void;
}

const usePaginatedData = <T extends {}>(
    initialPage: number,
    limit: number,
    active: boolean = false
): PaginatedData => {
    const [data, setData] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(initialPage);
    const [search, setSearch] = useState<string>('');

    const fetchData = async (newPage: number, limit: number, newSearch: string) => {
        setLoading(true);
        try {
            const productList = await ProdutoUseCase.getAllProdutoPaginados(newPage, limit, newSearch, active);
            setData(productList);
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
}

export default usePaginatedData;