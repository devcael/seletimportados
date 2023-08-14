export default class Fornecedor {
    public id: number;
    public nome: string;
    public cpfcnpj: string | null;
    public telefone: string | null;
    public email: string | null;
    public tipo: 'PF' | 'PJ' | null;
    public endereco: string | null;
    public cep: string | null;
    public numero: string | null;
    public complemento: string | null;
    public cidade: string | null;
    public estado: string | null;
    public pais: string | null;
    public crt: string | null;

    constructor(id: number, nome: string, cpfcnpj: string | null, telefone: string | null, email: string | null, tipo: 'PF' | 'PJ' | null, endereco: string | null, cep: string | null, numero: string | null, complemento: string | null, cidade: string | null, estado: string | null, pais: string | null, crt: string | null) {
        this.id = id;
        this.nome = nome;
        this.cpfcnpj = cpfcnpj;
        this.telefone = telefone;
        this.email = email;
        this.tipo = tipo;
        this.endereco = endereco;
        this.cep = cep;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
        this.crt = crt;
    }

    static fromJson(json: any): Fornecedor {
        return new Fornecedor(
            json.id,
            json.nome,
            json.cpfcnpj,
            json.telefone,
            json.email,
            json.tipo,
            json.endereco,
            json.cep,
            json.numero,
            json.complemento,
            json.cidade,
            json.estado,
            json.pais,
            json.crt
        );
    }

    toJson(params: { sendId: boolean }): any {
        return {
            id: params.sendId ? this.id : null,
            nome: this.nome,
            cpfcnpj: this.cpfcnpj,
            telefone: this.telefone,
            email: this.email,
            tipo: this.tipo,
            endereco: this.endereco,
            cep: this.cep,
            numero: this.numero,
            complemento: this.complemento,
            cidade: this.cidade,
            estado: this.estado,
            pais: this.pais,
            crt: this.crt
        };
    }
}