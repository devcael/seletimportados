export default class MoedaConversao {
    public id_taxa: number;
    public nome_da_moeda: string;
    public taxa_de_conversao_real: number;
    public simbolo: string;
    constructor(id_taxa: number, nome_da_moeda: string, taxa_de_conversao_real: number, simbolo: string) {
        this.id_taxa = id_taxa;
        this.nome_da_moeda = nome_da_moeda;
        this.taxa_de_conversao_real = taxa_de_conversao_real;
        this.simbolo = simbolo;
    }

    static fromJSON(json: any): MoedaConversao {
        return new MoedaConversao(
            json.id_taxa,
            json.nome_da_moeda,
            json.taxa_de_conversao_real,
            json.simbolo
        );
    }
}