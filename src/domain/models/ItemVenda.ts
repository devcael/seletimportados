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

    constructor(props: {
        id_itens_venda: number,
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
        id_venda: number
    }) {
        this.id_itens_venda = props.id_itens_venda;
        this.id_produto = props.id_produto;
        this.produto = props.produto;
        this.imei = props.imei;
        this.nome_produto = props.nome_produto;
        this.preco_produto = props.preco_produto;
        this.custo_produto = props.custo_produto;
        this.quantidade = props.quantidade;
        this.acrescimo = props.acrescimo;
        this.desconto = props.desconto;
        this.valortotal = props.valortotal;
        this.id_moeda_custo_produto = props.id_moeda_custo_produto;
        this.taxa_moeda_custo_produto = props.taxa_moeda_custo_produto;
        this.id_moeda_preco_produto = props.id_moeda_preco_produto;
        this.taxa_moeda_preco_produto = props.taxa_moeda_preco_produto;
        this.id_venda = props.id_venda;
        this.calcularValorTotal();
    }



    static fromJSON(json: any): ItemVenda {
        console.log("CHAMOU FROM JSON");

        return new ItemVenda({
            id_itens_venda: json.id_itens_venda,
            id_produto: json.id_produto,
            produto: Produto.fromJSON({ currProduto: json.produto, moedaCusto: json.produto.moeda_custo, moedaPreco: json.produto.moeda_preco }),
            imei: Imei.fromJson(json.imei),
            nome_produto: json.nome_produto,
            preco_produto: json.preco_produto,
            custo_produto: json.custo_produto,
            quantidade: json.quantidade,
            acrescimo: json.acrescimo,
            desconto: json.desconto,
            valortotal: json.valortotal,
            id_moeda_custo_produto: json.id_moeda_custo_produto,
            taxa_moeda_custo_produto: json.taxa_moeda_custo_produto,
            id_moeda_preco_produto: json.id_moeda_preco_produto,
            taxa_moeda_preco_produto: json.taxa_moeda_preco_produto,
            id_venda: json.id_venda
        });
    }


    static fromJsonList(lista: Array<any>): ItemVenda[] {

        let bufferList = [];

        for (let i = 0; i < lista.length; i++) {
            bufferList.push(ItemVenda.fromJSON(lista[i]));
        }
        return bufferList;
    }

    toJson(props: { sendId: boolean }): any {
        return {
            id_itens_venda: props.sendId ? this.id_itens_venda : null,
            id_produto: this.id_produto,
            produto: this.produto,
            imei: this.imei,
            nome_produto: this.nome_produto,
            preco_produto: this.preco_produto,
            custo_produto: this.custo_produto,
            quantidade: this.quantidade,
            acrescimo: this.acrescimo,
            desconto: this.desconto,
            valortotal: this.valortotal,
            id_moeda_custo_produto: this.id_moeda_custo_produto,
            taxa_moeda_custo_produto: this.taxa_moeda_custo_produto,
            id_moeda_preco_produto: this.id_moeda_preco_produto,
            taxa_moeda_preco_produto: this.taxa_moeda_preco_produto,
            id_venda: this.id_venda
        };
    }


    public setIdVenda(id_venda: number) {
        this.id_venda = id_venda;
    }

    setImei(imei: Imei | null) {
        this.imei = imei;
    }

    setProduto(produto: Produto) {
        this.produto = produto;
    }

    getDescontoConvertido(): number {
        return (this?.desconto ?? 0.00) * this.taxa_moeda_preco_produto;
    }

    getAcrecimoConvertido(): number {
        return (this?.acrescimo ?? 0.00) * this.taxa_moeda_preco_produto;
    }
    public alterarQuantidade(novaQuantidade: number) {
        this.quantidade = novaQuantidade;
        this.valortotal = (this.quantidade * this.preco_produto) + (this.acrescimo ?? 0.00) - (this.desconto ?? 0.00);
        this.calcularValorTotal();
    }

    public alterarAcrescimo(novoAcrescimo: number) {
        this.acrescimo = novoAcrescimo;
        this.calcularValorTotal();
    }

    public alterarDesconto(novoDesconto: number) {
        this.desconto = novoDesconto;
        this.calcularValorTotal();
    }

    public calcularValorTotal(): number {
        return (this.quantidade * this.preco_produto) + (this.acrescimo ?? 0.00) - (this.desconto ?? 0.00);
    }

    public getPrecoConvertido(): number {
        return this.preco_produto * this.taxa_moeda_preco_produto;
    }

    public getValorTotalConvertido(): number {
        return this.valortotal * this.taxa_moeda_preco_produto;
    }

}