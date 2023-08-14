class TipoPagamento {
    public idtiposdepagamento: number;
    public tipo: 'AP' | 'AV';
    public nome_tipo: string;

    constructor(idtiposdepagamento: number, tipo: 'AP' | 'AV', nome_tipo: string) {
        this.idtiposdepagamento = idtiposdepagamento;
        this.tipo = tipo;
        this.nome_tipo = nome_tipo;
    }

    static fromJson(json: any): TipoPagamento {
        return new TipoPagamento(
            json.idtiposdepagamento,
            json.tipo,
            json.nome_tipo
        );
    }

    toJson(params: { sendId: boolean }): any {
        return {
            idtiposdepagamento: params.sendId ? this.idtiposdepagamento : null,
            tipo: this.tipo,
            nome_tipo: this.nome_tipo
        };
    }
}

export default TipoPagamento;
