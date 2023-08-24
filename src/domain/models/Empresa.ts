class Empresa {
    id: number;
    nome: string;
    cpfcnpj: string | null;
    telefone: string | null;
    email: string | null;
    tipo: 'PF' | 'PJ' | null;
    endereco: string | null;
    cep: string | null;
    numero: string | null;
    complemento: string | null;
    cidade: string | null;
    estado: string | null;
    pais: string | null;
    crt: string | null;

    constructor(data: {
        id: number;
        nome: string;
        cpfcnpj: string | null;
        telefone: string | null;
        email: string | null;
        tipo: 'PF' | 'PJ' | null;
        endereco: string | null;
        cep: string | null;
        numero: string | null;
        complemento: string | null;
        cidade: string | null;
        estado: string | null;
        pais: string | null;
        crt: string | null;
    }) {
        this.id = data.id;
        this.nome = data.nome;
        this.cpfcnpj = data.cpfcnpj;
        this.telefone = data.telefone;
        this.email = data.email;
        this.tipo = data.tipo;
        this.endereco = data.endereco;
        this.cep = data.cep;
        this.numero = data.numero;
        this.complemento = data.complemento;
        this.cidade = data.cidade;
        this.estado = data.estado;
        this.pais = data.pais;
        this.crt = data.crt;
    }

    static fromJSON(json: any): Empresa {
        return new Empresa({
            id: json.id,
            nome: json.nome,
            cpfcnpj: json.cpfcnpj,
            telefone: json.telefone,
            email: json.email,
            tipo: json.tipo,
            endereco: json.endereco,
            cep: json.cep,
            numero: json.numero,
            complemento: json.complemento,
            cidade: json.cidade,
            estado: json.estado,
            pais: json.pais,
            crt: json.crt,
        });
    }

    toJSON(): any {
        return {
            id: this.id,
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
            crt: this.crt,
        };
    }
}


export default Empresa;