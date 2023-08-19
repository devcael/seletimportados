import Clientes from "@/domain/models/Clientes";
import ItemVenda from "@/domain/models/ItemVenda";
import PagamentoVenda from "@/domain/models/PagamentoVenda";
import TipoPagamento from "@/domain/models/TipoPagamento";
import useClientes from "@/hooks/useClientesFetch";
import useTipoPagamento from "@/hooks/useTipoPagamento";
import { createContext, use, useContext, useEffect, useState } from "react";

interface GerenciadorVendaMethods {
    adicionarItemVenda: (itemVenda: ItemVenda) => void;
    adicionarPagamento: (pagamento: PagamentoVenda, tipo: TipoPagamento) => void;
    removerPagamento: (index: number) => void;
    listaItems: ItemVenda[];
    removerItemPorIndex: (index: number) => void;
    alterarQuantidadeItem: (index: number, novaQuantidade: number) => void;
    listaPayments: PagamentoVenda[];
    tipoPagamentos: TipoPagamento[];
    calcTotalValue: () => number;
    calcSubTotalValue: () => number;
    desconto: number;
    acrescimo: number;
    setCurrCliente: (cliente: Clientes) => void;
    currCliente: Clientes | undefined;
    listOfClientes: Clientes[];
    setDesconto: (desconto: number) => void;
    setAcrescimo: (acrescimo: number) => void;
    alterarDescontoVenda: (porcentagem: number) => void;
    alterarAcrescimoVenda: (porcentagem: number) => void;
    calcValorPagoTotal: () => number;
}

function useGerenciadorVenda(): GerenciadorVendaMethods {
    const [listaItems, setListaItems] = useState<ItemVenda[]>([]);
    const [listaPayments, setListaPayments] = useState<PagamentoVenda[]>([]);
    const [desconto, setDesconto] = useState<number>(0.00);
    const [acrescimo, setAcrescimo] = useState<number>(0.00);
    const { tipoPagamentos, refresh } = useTipoPagamento();
    const { clientes, buscarClientes } = useClientes();
    const [currCliente, setCurrCliente] = useState<Clientes | undefined>(undefined);

    const adicionarItemVenda = (itemVenda: ItemVenda): void => {
        setListaItems([...listaItems, itemVenda]);
    };

    function alterarDescontoVenda(porcentagem: number): void {
        let valorDesconto = calcSubTotalValue() * (porcentagem / 100);
        setDesconto(valorDesconto);
    }
    function alterarAcrescimoVenda(porcentagem: number): void {
        let valorDesconto = calcSubTotalValue() * (porcentagem / 100);
        setAcrescimo(valorDesconto);
    }

    const alterarQuantidadeItem = (index: number, novaQuantidade: number): void => {
        const updatedItems = [...listaItems];
        updatedItems[index].alterarQuantidade(novaQuantidade);
        setListaItems(updatedItems);
    };

    const removerItemPorIndex = (index: number): void => {
        const updatedItems = listaItems.filter((_, i) => i !== index);
        setListaItems(updatedItems);
    };

    function calcTotalValue(): number {
        let valorTotal = 0;
        for (let index = 0; index < listaItems.length; index++) {
            const currItem: ItemVenda = listaItems[index];
            valorTotal += currItem.getValorTotalConvertido();
        }

        return (valorTotal + acrescimo) - desconto;
    }

    function calcSubTotalValue(): number {
        let valorTotal = 0;
        for (let index = 0; index < listaItems.length; index++) {
            const currItem: ItemVenda = listaItems[index];
            valorTotal += currItem.getValorTotalConvertido();
        }

        return valorTotal;
    }

    function _canAddMorePayments() {

    }

    function calcValorPagoTotal(): number {
        let valorTotal = 0;
        for (let index = 0; index < listaPayments.length; index++) {
            const currItem: PagamentoVenda = listaPayments[index];
            valorTotal += currItem.valorpago;
        }
        return valorTotal;
    }

    const adicionarPagamento = (pagamento: PagamentoVenda, tipo: TipoPagamento): void => {

        if (tipo.tipo.toLocaleLowerCase().includes("dinheiro")) {
            console.log("Tipo de  pagamento é dinheiro");
        }

        setListaPayments([...listaPayments, pagamento]);
    };

    const removerPagamento = (index: number): void => {
        const updatedItems = listaPayments.filter((_, i) => i !== index);
        setListaPayments(updatedItems);
    }

    useEffect(() => {
        refresh();
        buscarClientes();
        setCurrCliente(clientes[0]);
    }, []);

    return {
        alterarAcrescimoVenda,
        adicionarItemVenda,
        adicionarPagamento,
        listOfClientes: clientes,
        calcValorPagoTotal,
        alterarQuantidadeItem,
        alterarDescontoVenda,
        removerPagamento,
        setCurrCliente,
        currCliente,
        listaItems,
        tipoPagamentos,
        listaPayments,
        removerItemPorIndex,
        calcTotalValue,
        desconto,
        acrescimo,
        setDesconto,
        setAcrescimo,
        calcSubTotalValue

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