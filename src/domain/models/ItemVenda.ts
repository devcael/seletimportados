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

    static fromJson(json: any): ItemVenda {
        return new ItemVenda(
            json.id_itens_venda,
            json.id_produto,
            json.nome_produto,
            json.preco_produto,
            json.custo_produto,
            json.quantidade,
            json.acrescimo,
            json.desconto,
            json.produto,
            null,
            json.valortotal,
            json.id_moeda_custo_produto,
            json.taxa_moeda_custo_produto,
            json.id_moeda_preco_produto,
            json.taxa_moeda_preco_produto,
            json.id_venda
        );
    }

    toJson(props: { sendId: boolean }): any {
        return {
            id_itens_venda: props.sendId ? this.id_itens_venda : null,
            id_produto: this.id_produto,
            nome_produto: this.nome_produto,
            preco_produto: this.preco_produto,
            custo_produto: this.custo_produto,
            quantidade: this.quantidade,
            acrescimo: this.acrescimo,
            desconto: this.desconto,
            valortotal: this.valortotal,
            id_moeda_custo_produto: this.produto.moeda_custo.id_taxa,
            taxa_moeda_custo_produto: this.produto.moeda_custo.taxa_de_conversao_real,
            id_moeda_preco_produto: this.produto.moeda_preco.id_taxa,
            taxa_moeda_preco_produto: this.produto.moeda_preco.taxa_de_conversao_real,
            id_venda: this.id_venda,
        };
    }

    setImei(imei: Imei | null) {
        this.imei = imei;
    }

    setProduto(produto: Produto) {
        this.produto = produto;
    }

}