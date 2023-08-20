export type QueryParamsPagination = {
    currPage: number;
    pageSize: number;
    search: string;
    tipo?: 'VENDA' | 'ORCAMENTO';
    situacao?: 'ABERTA' | 'PENDENTE' | 'FINALIZADA';
    dataInicial?: string; dataFinal?: string;
};
