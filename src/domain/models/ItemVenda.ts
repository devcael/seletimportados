import { ItemImageProps } from "semantic-ui-react";
import Produto from "./Produto";
import Imei from "./Imei";

export default class ItemVenda {
    public id_itens_venda: number;
    public id_produto: number;
    public produto: Produto;
    public imei: Imei | null;
    public nome_produto: string;
    public preco_produto: number;
    public custo_produto: number;
    public quantidade: number;
    public acrescimo: number | null;
    public desconto: number | null;
    public valortotal: number;
    public id_moeda_custo_produto: number;
    public taxa_moeda_custo_produto: number;
    public id_moeda_preco_produto: number;
    public taxa_moeda_preco_produto: number;
    public id_venda: number;

    constructor(id_itens_venda: number,
        id_produto: number,
        nome_produto: string,
        preco_produto: number,
        custo_produto: number,
        quantidade: number,
        acrescimo: number | null,
        desconto: number | null,
        produto: Produto,
        imei: Imei | null,
        valortotal: number,
        id_moeda_custo_produto: number,
        taxa_moeda_custo_produto: number,
        id_moeda_preco_produto: number,
        taxa_moeda_preco_produto: number,
        id_venda: number) {
        this.id_itens_venda = id_itens_venda;
        this.id_produto = id_produto;
        this.produto = produto;
        this.imei = imei;
        this.nome_produto = nome_produto;
        this.preco_produto = preco_produto;
        this.custo_produto = custo_produto;
        this.quantidade = quantidade;
        this.acrescimo = acrescimo;
        this.desconto = desconto;
        this.valortotal = valortotal;
        this.id_moeda_custo_produto = id_moeda_custo_produto;
        this.taxa_moeda_custo_produto = taxa_moeda_custo_produto;
        this.id_moeda_preco_produto = id_moeda_preco_produto;
        this.taxa_moeda_preco_produto = taxa_moeda_preco_produto;
        this.id_venda = id_venda;
    }

}