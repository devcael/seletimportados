import Clientes from "./Clientes";
import ItemVenda from "./ItemVenda";
import PagamentoVenda from "./PagamentoVenda";

export default class Venda {
    public id: number;
    public data: string;
    public hora: string;
    public totalvenda: number;
    public situacao: 'ABERTA' | 'PENDENTE' | 'FINALIZADA' | null;
    public id_usuario: number;
    public id_cliente: number | null;
    public cliente: Clientes | null;
    public desconto: number | null;
    public acrescimo: number | null;
    public subtotal: number;
    public totalcomdescontoeacrescimo: number | null;
    public tipo: 'VENDA' | 'ORCAMENTO' | null;
    public listItems: ItemVenda[];
    public listDePagamento: PagamentoVenda[]


    constructor(props: {
        id: number,
        data: string,
        hora: string,
        totalvenda: number,
        clienta: Clientes | null,
        situacao: 'ABERTA' | 'PENDENTE' | 'FINALIZADA' | null,
        id_usuario: number,
        id_cliente: number | null,
        desconto: number | null,
        acrescimo: number | null,
        subtotal: number,
        listaDePagamento: PagamentoVenda[],
        totalcomdescontoeacrescimo: number | null,
        tipo: 'VENDA' | 'ORCAMENTO' | null,
        listItems: ItemVenda[]
    }) {
        this.id = props.id;
        this.data = props.data;
        this.hora = props.hora;
        this.cliente = props.clienta;
        this.totalvenda = props.totalvenda;
        this.situacao = props.situacao;
        this.id_usuario = props.id_usuario;
        this.id_cliente = props.id_cliente;
        this.desconto = props.desconto;
        this.acrescimo = props.acrescimo;
        this.listDePagamento = props.listaDePagamento;
        this.subtotal = props.subtotal;
        this.totalcomdescontoeacrescimo = props.totalcomdescontoeacrescimo;
        this.tipo = props.tipo;
        this.listItems = props.listItems;
    }

    public getEnderecoInline(): string {
        return this.cliente?.endereco + ', ' + this.cliente?.numero + ' - ' + ' - ' + this.cliente?.cidade + ' - ' + this.cliente?.estado;
    }

    static fromJson(json: any) {
        return new Venda({
            id: json.id,
            data: json.data,
            hora: json.hora,
            totalvenda: parseFloat(json.totalvenda),
            clienta: Clientes.fromJson(json.cliente),
            situacao: json.situacao,
            id_usuario: json.id_usuario,
            id_cliente: json.id_cliente,
            desconto: json.desconto,
            acrescimo: json.acrescimo,
            subtotal: parseFloat(json.subtotal),
            listaDePagamento: PagamentoVenda.fromJsonList(json.payments),
            totalcomdescontoeacrescimo: parseFloat(json.totalcomdescontoeacrescimo),
            tipo: json.tipo,
            listItems: ItemVenda.fromJsonList(json.items)
        });
    }
}