import MoedaConversao from "@/domain/models/MoedaConversao";
import MoedaConversaoUseCase from "@/domain/usecases/moedas_conversao_usecase";
import { useEffect, useState } from "react";

export default function useMoedasFetcher() {
    const [moedas, setMoedas] = useState<MoedaConversao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchMoedas = async () => {
        try {
            const listOfMoedas: MoedaConversao[] = await MoedaConversaoUseCase.getAllMoedas();
            setMoedas(listOfMoedas);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar moedas:", error);
        }
    };

    useEffect(() => {
        fetchMoedas();
    }, []);

    const refetchMoedas = () => {
        setLoading(true);
        fetchMoedas();
    };

    return {
        moedas,
        loading,
        refetchMoedas,
    };
}
