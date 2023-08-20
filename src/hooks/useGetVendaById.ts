import Venda from '@/domain/models/Venda';
import VendaUseCase from '@/domain/usecases/venda_usecase';
import { useEffect, useState } from 'react';

function useVendaDetails(id: number) {
    const [venda, setVenda] = useState<Venda | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Estado de loading

    const fetchVendaDetails = async () => {
        try {
            const fetchedVenda = await VendaUseCase.getVenda({ id_venda: id });
            setVenda(fetchedVenda);
        } catch (error) {
            console.error('Erro ao buscar detalhes da venda:', error);
        } finally {
            setLoading(false); // Defina loading como false após a busca
        }
    };

    useEffect(() => {
        fetchVendaDetails();
    }, [id]);

    const refreshVendaDetails = async () => {
        setLoading(true); // Define loading como true antes da atualização
        fetchVendaDetails();
    };

    return { venda, loading, refreshVendaDetails };
}

export default useVendaDetails;
