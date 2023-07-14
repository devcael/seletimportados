import "reflect-metadata";

const MinhaAnotacao = "MinhaAnotacao";

function Table(tableName: string) {
    return function (target: any) {
        Reflect.defineMetadata(MinhaAnotacao, tableName, target);
    };
}

const MinhaAnotacao2 = "MinhaAnotacao";

function MeuDecorator(valor: string) {
    return function (target: any, propriedade: string) {
        Reflect.defineMetadata(MinhaAnotacao, valor, target, propriedade);
    };
}

@Table("micael")
class MinhaClasse<T> {

    @MeuDecorator("id")
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}

function verificaAnotacao<T>(classe: new (...args: any[]) => T): string | null {
    const nomeAnotacao = Reflect.getMetadata(MinhaAnotacao, classe);
    return nomeAnotacao || null;
}

const nomeAnotacao = verificaAnotacao(MinhaClasse);
console.log(nomeAnotacao); // Saída: nomeAnotacao ou null