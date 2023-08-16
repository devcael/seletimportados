import TipoPagamento from "@/domain/models/TipoPagamento";
import ReqHttp from "@/domain/services/ReqHttp";
import { useEffect, useState } from "react";

function useTipoPagamento(): {
    tipoPagamentos: TipoPagamento[];
    refresh: () => void;
} {
    const [tipoPagamentos, setTipoPagamentos] = useState<TipoPagamento[]>([]);

    async function fetchTipoPagamentos() {
        try {
            const { body } = await ReqHttp.get({
                path: '/tipopagamento/getTodos',
                secondsTimeout: 10,
            });

            const listaTipoPagamentos: TipoPagamento[] = body;
            setTipoPagamentos(listaTipoPagamentos);
        } catch (error) {
            console.error('Erro ao buscar todos os tipos de pagamento:', error);
        }
    }

    const refresh = () => {
        fetchTipoPagamentos();
    };

    useEffect(() => {
        fetchTipoPagamentos();
    }, []);

    return {
        tipoPagamentos,
        refresh,
    };
}

export default useTipoPagamento;