import ItemVenda from "@/domain/models/ItemVenda";
import PagamentoVenda from "@/domain/models/PagamentoVenda";
import { createContext, useContext, useState } from "react";

class CriarVenda {

    listOfPayments: PagamentoVenda[] = [];
    listOfItems: ItemVenda[] = [];


    adicionarItemVenda(itemVenda: ItemVenda): void {

    }

    adicionarPagamento(pagamento: PagamentoVenda): void {

    }

    getValorTotal(): number {
        return 0;
    }

    validarVenda(): void { }

}

interface CriarVendaContextType {
    criarVendaInstance: CriarVenda;
}

const CriarVendaContext = createContext<CriarVendaContextType | undefined>(undefined);

export function useCriarVendaContext(): CriarVendaContextType {
    const context = useContext(CriarVendaContext);
    if (!context) {
        throw new Error('useCriarVendaContext must be used within a CriarVendaProvider');
    }
    return context;
}

export function CriarVendaProvider({ children }: { children: React.ReactNode }) {
    const criarVendaInstance = new CriarVenda();

    return (
        <CriarVendaContext.Provider value={{ criarVendaInstance }}>
            {children}
        </CriarVendaContext.Provider>
    );
}

interface CriarVendaMethods {
    adicionarItemVenda: (itemVenda: ItemVenda) => void;
    adicionarPagamento: (pagamento: PagamentoVenda) => void;
    getValorTotal: () => number;
    validarVenda: () => void;
    listaItems: ItemVenda[];
    listaPayments: PagamentoVenda[];
}

function useCriarVenda(): CriarVendaMethods {
    const { criarVendaInstance } = useCriarVendaContext();

    const adicionarItemVenda = (itemVenda: ItemVenda): void => {
        criarVendaInstance.adicionarItemVenda(itemVenda);
        const updatedList = [...criarVendaInstance.listOfItems];
        setListItems(updatedList);
    };

    const adicionarPagamento = (pagamento: PagamentoVenda): void => {
        criarVendaInstance.adicionarPagamento(pagamento);
        const updatedList = [...criarVendaInstance.listOfPayments];
        setListPayments(updatedList);
    };

    const getValorTotal = (): number => {
        return criarVendaInstance.getValorTotal();
    };

    const validarVenda = (): void => {
        criarVendaInstance.validarVenda();
    };

    const [listItems, setListItems] = useState<ItemVenda[]>(criarVendaInstance.listOfItems);
    const [listPayments, setListPayments] = useState<PagamentoVenda[]>(criarVendaInstance.listOfPayments);

    return {
        adicionarItemVenda,
        adicionarPagamento,
        getValorTotal,
        validarVenda,
        listaItems: listItems,
        listaPayments: listPayments,
    };
}

export default useCriarVenda;