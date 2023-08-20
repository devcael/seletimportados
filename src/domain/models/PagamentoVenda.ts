import TipoPagamento from "./TipoPagamento";

export default class PagamentoVenda {
    public idpagamento_venda: number;
    public id_venda: number;
    public id_tipo_pagamento: number;
    public valorpago: number;
    public troco: number | null;
    public tipo_pagamento: TipoPagamento | null;
    public data_pagamento: string | null;

    constructor(idpagamento_venda: number, id_venda: number, id_tipo_pagamento: number, valorpago: number, troco: number | null, tipo_pagamento: TipoPagamento | null, data_pagamento: string | null,) {
        this.idpagamento_venda = idpagamento_venda;
        this.id_venda = id_venda;
        this.id_tipo_pagamento = id_tipo_pagamento;
        this.valorpago = valorpago;
        this.troco = troco;
        this.tipo_pagamento = tipo_pagamento;
        this.data_pagamento = data_pagamento;
    }

    toJson(params: { sendId: boolean }): any {
        return {
            idpagamento_venda: params.sendId ? this.idpagamento_venda : null,
            id_venda: this.id_venda,
            id_tipo_pagamento: this.tipo_pagamento?.idtiposdepagamento ?? 1,
            valorpago: this.valorpago,
            troco: this.troco,
        };
    }

    static fromJsonList(lista: Array<any>): PagamentoVenda[] {

        let bufferList = [];

        for (let i = 0; i < lista.length; i++) {
            bufferList.push(PagamentoVenda.fromJson(lista[i]));
        }
        return bufferList;
    }

    public setIdVenda(id_venda: number) {
        this.id_venda = id_venda;
    }

    static fromJson(json: any): PagamentoVenda {

        return new PagamentoVenda(
            json.idpagamento_venda,
            json.id_venda,
            json.id_tipo_pagamento,
            json.valorpago,
            json.troco,
            json.tipo_pagamento,
            json.data_pagamento
        );
    }

    setTipoPagamento(tipo_pagamento: TipoPagamento | null) {
        this.tipo_pagamento = tipo_pagamento;
    }
}
