import MoedaConversao from "@/domain/models/MoedaConversao";
import MoedaConversaoUseCase from "@/domain/usecases/moedas_conversao_usecase";
import { useEffect, useState } from "react";






function useFetchMoedaDolar() {
  const [moedaDolar, setMoedaDolar] = useState<MoedaConversao | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchMoedaDolar() {
    try {
      const dolarMoeda = await MoedaConversaoUseCase.getMoedaDolar();
      setMoedaDolar(dolarMoeda);
    } catch (error) {
      console.error('Erro ao buscar a moeda DOLAR:', error);
      setError('Erro ao buscar a moeda DOLAR');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {


    fetchMoedaDolar();
  }, []);

  return { moedaDolar, loading, error, fetchMoedaDolar };
}

export default useFetchMoedaDolar;