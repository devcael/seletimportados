export default class PagamentoVenda {
    public idpagamento_venda: number;
    public id_venda: number;
    public id_tipo_pagamento: number;
    public valorpago: number;
    public troco: number | null;
    public tipo_pagamento: TipoPagamento;

    constructor(idpagamento_venda: number, id_venda: number, id_tipo_pagamento: number, valorpago: number, troco: number | null, tipo_pagamento: TipoPagamento) {
        this.idpagamento_venda = idpagamento_venda;
        this.id_venda = id_venda;
        this.id_tipo_pagamento = id_tipo_pagamento;
        this.valorpago = valorpago;
        this.troco = troco;
        this.tipo_pagamento = tipo_pagamento;
    }

}