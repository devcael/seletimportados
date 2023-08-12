import Clientes from "./Clientes";
import ItemVenda from "./ItemVenda";
import PagamentoVenda from "./PagamentoVenda";

class Venda {
    public id: number;
    public data: Date;
    public hora: string;
    public totalvenda: number;
    public situacao: 'ABERTA' | 'PENDENTE' | 'FINALIZADA' | null;
    public id_usuario: Usuario;
    public id_cliente: Clientes;
    public desconto: number | null;
    public acrescimo: number | null;
    public subtotal: number;
    public totalcomdescontoeacrescimo: number | null;
    public tipo: 'VENDA' | 'ORCAMENTO' | null;
    public listItems: ItemVenda[];
    public listDePagamento: PagamentoVenda[]


    constructor(id: number,
        data: Date,
        hora: string,
        totalvenda: number,
        situacao: 'ABERTA' | 'PENDENTE' | 'FINALIZADA' | null,
        id_usuario: Usuario,
        id_cliente: Clientes,
        desconto: number | null,
        acrescimo: number | null,
        subtotal: number,
        listaDePagamento: PagamentoVenda[],
        totalcomdescontoeacrescimo: number | null,
        tipo: 'VENDA' | 'ORCAMENTO' | null,
        listItems: ItemVenda[]) {
        this.id = id;
        this.data = data;
        this.hora = hora;
        this.totalvenda = totalvenda;
        this.situacao = situacao;
        this.id_usuario = id_usuario;
        this.id_cliente = id_cliente;
        this.desconto = desconto;
        this.acrescimo = acrescimo;
        this.listDePagamento = listaDePagamento;
        this.subtotal = subtotal;
        this.totalcomdescontoeacrescimo = totalcomdescontoeacrescimo;
        this.tipo = tipo;
        this.listItems = listItems;
    }
}