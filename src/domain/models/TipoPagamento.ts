class TipoPagamento {
    public idtiposdepagamento: number;
    public tipo: 'AP' | 'AV';
    public nome_tipo: string;

    constructor(idtiposdepagamento: number, tipo: 'AP' | 'AV', nome_tipo: string) {
        this.idtiposdepagamento = idtiposdepagamento;
        this.tipo = tipo;
        this.nome_tipo = nome_tipo;
    }
}