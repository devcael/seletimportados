import ItemVenda from "@/domain/models/ItemVenda";
import PagamentoVenda from "@/domain/models/PagamentoVenda";
import { createContext, useContext, useState } from "react";

interface GerenciadorVendaMethods {
    adicionarItemVenda: (itemVenda: ItemVenda) => void;
    adicionarPagamento: (pagamento: PagamentoVenda) => void;
    listaItems: ItemVenda[];
    removerItemPorIndex: (index: number) => void;
    alterarQuantidadeItem: (index: number, novaQuantidade: number) => void;
    listaPayments: PagamentoVenda[];
}

function useGerenciadorVenda(): GerenciadorVendaMethods {
    const [listaItems, setListaItems] = useState<ItemVenda[]>([]);
    const [listaPayments, setListaPayments] = useState<PagamentoVenda[]>([]);

    const adicionarItemVenda = (itemVenda: ItemVenda): void => {
        setListaItems([...listaItems, itemVenda]);
    };

    const alterarQuantidadeItem = (index: number, novaQuantidade: number): void => {
        const updatedItems = [...listaItems];
        updatedItems[index].alterarQuantidade(novaQuantidade);
        setListaItems(updatedItems);
    };

    const removerItemPorIndex = (index: number): void => {
        const updatedItems = listaItems.filter((_, i) => i !== index);
        setListaItems(updatedItems);
    };

    const adicionarPagamento = (pagamento: PagamentoVenda): void => {
        setListaPayments([...listaPayments, pagamento]);
    };


    return {
        adicionarItemVenda,
        adicionarPagamento,
        alterarQuantidadeItem,
        listaItems,
        listaPayments,
        removerItemPorIndex
    };
}

interface GerenciadorVendaContextType {
    gerenciadorVenda: GerenciadorVendaMethods;
}

const GerenciadorVendaContext = createContext<GerenciadorVendaContextType | undefined>(undefined);

export function useGerenciadorVendaContext(): GerenciadorVendaMethods {
    const context = useContext(GerenciadorVendaContext);
    if (!context) {
        throw new Error('useGerenciadorVendaContext must be used within a GerenciadorVendaProvider');
    }
    return context.gerenciadorVenda;
}

export function GerenciadorVendaProvider({ children }: { children: React.ReactNode }) {
    const gerenciadorVenda = useGerenciadorVenda();

    return (
        <GerenciadorVendaContext.Provider value={{ gerenciadorVenda }}>
            {children}
        </GerenciadorVendaContext.Provider>
    );
}

export default useGerenciadorVenda;