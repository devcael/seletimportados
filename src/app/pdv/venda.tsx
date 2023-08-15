import ItemVenda from "@/domain/models/ItemVenda";
import { useState } from "react";

class Venda {
    private listaItens: ItemVenda[] = [];

    // Método para adicionar um item à lista
    public adicionarItem(item: ItemVenda) {
        this.listaItens.push(item);
        // Notificar a tela sobre a atualização na lista
        // ...
    }

    // Método para calcular o valor total da venda com base nos itens na lista
    public calcularValorTotalVenda() {
        let valorTotal = 0;
        for (const item of this.listaItens) {
            valorTotal += item.valortotal;
        }
        return valorTotal;
    }

    // Método para excluir um item pelo índice
    public excluirItemPorIndice(indice: number) {
        if (indice >= 0 && indice < this.listaItens.length) {
            this.listaItens.splice(indice, 1);
            // Notificar a tela sobre a atualização na lista
            // ...
        }
    }
}
export default function useVenda(): {
    venda: Venda;
    adicionarItem: (itemData: ItemVenda) => void;
    calcularValorTotal: () => number;
    excluirItemPorIndice: (indice: number) => void;
} {
    const [venda, setVenda] = useState<Venda>(new Venda());

    const adicionarItem = (itemData: ItemVenda): void => {
        const novoItem = itemData;
        venda.adicionarItem(novoItem);
        setVenda(venda);
    };

    const calcularValorTotal = (): number => {
        return venda.calcularValorTotalVenda();
    };

    const excluirItemPorIndice = (indice: number): void => {
        venda.excluirItemPorIndice(indice);
        setVenda(venda);
    };

    return {
        venda,
        adicionarItem,
        calcularValorTotal,
        excluirItemPorIndice,
    };
}