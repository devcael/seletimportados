import { send } from "node:process";
import MoedaConversao from "./MoedaConversao";
import Fornecedor from "./Fornecedor";

export default class Produto {
    id: number;
    nome: string;
    ean: string | null;
    preco: number;
    custo: number;
    id_fornecedor: Fornecedor;
    moeda_custo: MoedaConversao;
    moeda_preco: MoedaConversao;
    valor_moeda_preco: number;
    valor_moeda_custo: number;
    ativo: boolean | null;
    data_de_cadastro: Date | null;
    estoque: number | null;
    marca: string | null;


    constructor(id: number, nome: string, ean: string | null, preco: number, custo: number, id_fornecedor: Fornecedor, moeda_custo: MoedaConversao, moeda_preco: MoedaConversao, valor_moeda_preco: number, valor_moeda_custo: number, ativo: boolean | null, data_de_cadastro: Date | null, estoque: number | null, marca: string | null) {
        this.id = id;
        this.nome = nome;
        this.ean = ean;
        this.preco = preco;
        this.custo = custo;
        this.id_fornecedor = id_fornecedor;
        this.moeda_custo = moeda_custo;
        this.moeda_preco = moeda_preco;
        this.valor_moeda_preco = valor_moeda_preco;
        this.valor_moeda_custo = valor_moeda_custo;
        this.ativo = ativo;
        this.data_de_cadastro = data_de_cadastro;
        this.estoque = estoque;
        this.marca = marca;
    }

    static fromJSON(json: any): Produto {
        return new Produto(
            json.currProduto.id,
            json.currProduto.nome,
            json.currProduto.ean,
            json.currProduto.preco,
            json.currProduto.custo,
            json.currProduto.id_fornecedor,
            MoedaConversao.fromJSON(json.moedaCusto),
            MoedaConversao.fromJSON(json.moedaPreco),
            json.currProduto.valor_moeda_preco,
            json.currProduto.valor_moeda_custo,
            json.currProduto.ativo,
            json.currProduto.data_de_cadastro ? new Date(json.currProduto.data_de_cadastro) : null,
            json.currProduto.estoque,
            json.currProduto.marca
        );
    }
    toJson(param: { sendId: boolean }): any {
        return {
            id: param.sendId ? this.id : null,
            nome: this.nome,
            ean: this.ean,
            preco: this.preco,
            custo: this.custo,
            id_fornecedor: this.id_fornecedor.id,
            id_moeda_custo: this.moeda_custo.id_taxa,
            id_moeda_preco: this.moeda_preco.id_taxa,
            valor_moeda_preco: this.valor_moeda_preco,
            valor_moeda_custo: this.valor_moeda_custo,
            ativo: this.ativo,
            data_de_cadastro: this.data_de_cadastro,
            estoque: this.estoque,
            marca: this.marca,
        };
    }

}