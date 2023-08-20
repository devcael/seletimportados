import ReqHttp from "@/domain/services/ReqHttp";
import { useEffect, useState } from "react";

function useEstatisticas(dataInicial: string, dataFinal: string) {
    const [dadosEstatisticos, setDadosEstatisticos] = useState(null);

    async function fetchEstatisticas(dataInicial: string, dataFinal: string) {
        try {
            const response = await ReqHttp.get({
                path: '/venda/estatisticas_de_vendas', // Atualize o caminho correto
                queryParams: {
                    dataInicial,
                    dataFinal,
                },
                secondsTimeout: 10,
            });
            setDadosEstatisticos(response.body);
        } catch (error) {
            console.error('Erro ao buscar as estatísticas:', error);
        }
    }
    useEffect(() => {
        fetchEstatisticas(dataInicial, dataFinal);
    }, []);

    return { dadosEstatisticos, fetchEstatisticas, };
}

export default useEstatisticas;