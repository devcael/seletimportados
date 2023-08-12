import MoedaConversao from "./MoedaConversao";

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

}