"use client"
import React from 'react';
import AutoSuggestInput from './autoSugestion';
import AutoCompleteInput from '../produtos/components/auto_complete_input';
import { useEffect, useState } from 'react';
import ProdutoUseCase from '@/domain/usecases/produto_usecase';
import Produto from '@/domain/models/Produto';

interface PaginatedData {
    data: Produto[];
    loading: boolean;
    page: number;
    search: string
    fetchData: (page: number, search: string) => void;
}

const usePaginatedData = <T extends {}>(
    initialPage: number,
    limit: number
): PaginatedData => {
    const [data, setData] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(initialPage);
    const [search, setSearch] = useState<string>('');

    const fetchData = async (newPage: number, newSearch: string) => {
        setLoading(true);
        try {
            const productList = await ProdutoUseCase.getAllProdutoPaginados(newPage, limit, newSearch);
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
        fetchData(initialPage, '');
    }, []);

    return { data, loading, fetchData, page, search };
}

const ProdutoList: React.FC = () => {
    const limit = 2; // Limite de itens por página

    const { page, data, loading, fetchData } = usePaginatedData<Produto>(1, limit);

    const handlePageChange = (newPage: number, newSearch: string) => {
        fetchData(newPage, newSearch);
    };

    return (
        <div>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <ul>
                    {data.map(produto => (
                        <li key={produto.id}>{produto.nome}</li>
                    ))}
                </ul>
            )}

            <button onClick={() => handlePageChange(page + 1, '')}>
                Carregar próxima página: {page + 1}
            </button>
            <button onClick={() => handlePageChange(page - 1, '')}>
                Carregar Pagina Anterior: {page - 1}
            </button>
        </div>
    );
};

export default ProdutoList;








/* const Home: React.FC = () => {
    return (
        <div>
            <h1>Input com Sugestões</h1>
            <AutoCompleteInput></AutoCompleteInput>
        </div>
    );
};

export default Home; */