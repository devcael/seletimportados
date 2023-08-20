import { useEffect, useState } from 'react';
import CabecalhoVenda from '@/domain/models/CabecalhoVenda';
import VendaUseCase from '@/domain/usecases/venda_usecase';
import { QueryParamsPagination } from '@/types/QueryParamsPagination';
import dayjs from 'dayjs';
import useEstatisticas from './useEstatisticas';
import { DadosEstatisticos } from '@/core/controllers/venda_controller';

interface PaginatedData {
    data: CabecalhoVenda[];
    loading: boolean;
    page: number;
    search: string;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    fetchData: (newPage: number, limit: number, newSearch: string, queryParamsPag?: QueryParamsPagination) => void;
    selectedDates: [Date, Date];
    setSelectedDates: (dates: [Date, Date]) => void;
    defaultDates: [Date, Date];
    dadosEstatisticos: DadosEstatisticos | null;
    fetchEstatisticas: (dataInicial: string, dataFinal: string) => void;
}

const usePaginatedDataVenda = (
    initialPage: number,
    limit: number
): PaginatedData => {
    const [data, setData] = useState<CabecalhoVenda[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(initialPage);
    const [search, setSearch] = useState<string>('');
    const defaultDates: [Date, Date] = [dayjs().startOf("month").toDate(), dayjs().endOf("month").toDate()];
    const { dadosEstatisticos, fetchEstatisticas } = useEstatisticas(dayjs(defaultDates[0]).format('YYYY-MM-DD'), dayjs(defaultDates[1]).format('YYYY-MM-DD'));
    // Defina a data padrão do componente


    // Estado para armazenar a lista selecionada
    const [selectedDates, setSelectedDates] = useState<[Date, Date]>(defaultDates);

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
            fetchEstatisticas(dayjs(selectedDates[0]).format('YYYY-MM-DD'), dayjs(selectedDates[1]).format('YYYY-MM-DD'));
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

    return { dadosEstatisticos, fetchEstatisticas, defaultDates, data, loading, fetchData, page, search, setPage, setSearch, selectedDates, setSelectedDates };
};

export default usePaginatedDataVenda;

