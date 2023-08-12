class Produto {
    id: number;
    nome: string;
    ean: string | null;
    preco: number;
    custo: number;
    id_fornecedor: number;
    id_moeda_custo: number;
    id_moeda_preco: number;
    valor_moeda_preco: number;
    valor_moeda_custo: number;
    ativo: boolean | null;

    constructor(id: number, nome: string, ean: string | null, preco: number, custo: number, id_fornecedor: number, id_moeda_custo: number, id_moeda_preco: number, valor_moeda_preco: number, valor_moeda_custo: number, ativo: boolean | null) {
        this.id = id;
        this.nome = nome;
        this.ean = ean;
        this.preco = preco;
        this.custo = custo;
        this.id_fornecedor = id_fornecedor;
        this.id_moeda_custo = id_moeda_custo;
        this.id_moeda_preco = id_moeda_preco;
        this.valor_moeda_preco = valor_moeda_preco;
        this.valor_moeda_custo = valor_moeda_custo;
        this.ativo = ativo;
    }

    static fromDatabase(produto: Produto): Produto {
        return new Produto(
            produto.id,
            produto.nome,
            produto.ean,
            produto.preco,
            produto.custo,
            produto.id_fornecedor,
            produto.id_moeda_custo,
            produto.id_moeda_preco,
            produto.valor_moeda_preco,
            produto.valor_moeda_custo,
            produto.ativo
        );
    }
}