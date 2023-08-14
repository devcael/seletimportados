import TipoPagamento from "./TipoPagamento";

export default class PagamentoVenda {
    public idpagamento_venda: number;
    public id_venda: number;
    public id_tipo_pagamento: number;
    public valorpago: number;
    public troco: number | null;
    public tipo_pagamento: TipoPagamento | null;

    constructor(idpagamento_venda: number, id_venda: number, id_tipo_pagamento: number, valorpago: number, troco: number | null, tipo_pagamento: TipoPagamento | null) {
        this.idpagamento_venda = idpagamento_venda;
        this.id_venda = id_venda;
        this.id_tipo_pagamento = id_tipo_pagamento;
        this.valorpago = valorpago;
        this.troco = troco;
        this.tipo_pagamento = tipo_pagamento;
    }

    toJson(params: { sendId: boolean }): any {
        return {
            idpagamento_venda: params.sendId ? this.idpagamento_venda : null,
            id_venda: this.id_venda,
            id_tipo_pagamento: this.id_tipo_pagamento,
            valorpago: this.valorpago,
            troco: this.troco,
        };
    }

    static fromJson(json: any): PagamentoVenda {
        return new PagamentoVenda(
            json.idpagamento_venda,
            json.id_venda,
            json.id_tipo_pagamento,
            json.valorpago,
            json.troco,
            null
        );
    }

    setTipoPagamento(tipo_pagamento: TipoPagamento | null) {
        this.tipo_pagamento = tipo_pagamento;
    }
}
