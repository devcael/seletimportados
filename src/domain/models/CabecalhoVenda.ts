export default class CabecalhoVenda {
    id: number;
    data: string;
    hora: string;
    totalvenda: string;
    situacao: 'ABERTA' | 'PENDENTE' | 'FINALIZADA' | null;
    id_usuario: number;
    id_cliente: number;
    desconto: string | null;
    acrescimo: string | null;
    subtotal: string;
    totalcomdescontoeacrescimo: string;
    tipo: 'VENDA' | 'ORCAMENTO' | null;
    nome: string;

    constructor(
        id: number,
        data: string,
        hora: string,
        totalvenda: string,
        situacao: 'ABERTA' | 'PENDENTE' | 'FINALIZADA' | null,
        id_usuario: number,
        id_cliente: number,
        desconto: string,
        acrescimo: string,
        subtotal: string,
        totalcomdescontoeacrescimo: string,
        tipo: 'VENDA' | 'ORCAMENTO' | null,
        nome: string
    ) {
        this.id = id;
        this.data = data;
        this.hora = hora;
        this.totalvenda = totalvenda;
        this.situacao = situacao;
        this.id_usuario = id_usuario;
        this.id_cliente = id_cliente;
        this.desconto = desconto;
        this.acrescimo = acrescimo;
        this.subtotal = subtotal;
        this.totalcomdescontoeacrescimo = totalcomdescontoeacrescimo;
        this.tipo = tipo;
        this.nome = nome;
    }

    static fromJson(json: any): CabecalhoVenda {
        return new CabecalhoVenda(
            json.id,
            json.data,
            json.hora,
            json.totalvenda,
            json.situacao,
            json.id_usuario,
            json.id_cliente,
            json.desconto,
            json.acrescimo,
            json.subtotal,
            json.totalcomdescontoeacrescimo,
            json.tipo,
            json.nome
        );
    }

    toJson(props: { sendId: boolean }): any {
        return {
            id: props.sendId ? this.id : null,
            data: this.data,
            hora: this.hora,
            totalvenda: this.totalvenda,
            situacao: this.situacao,
            id_usuario: this.id_usuario,
            id_cliente: this.id_cliente,
            desconto: this.desconto,
            acrescimo: this.acrescimo,
            subtotal: this.subtotal,
            totalcomdescontoeacrescimo: this.totalcomdescontoeacrescimo,
            tipo: this.tipo,
            nome: this.nome,
        };
    }
}
