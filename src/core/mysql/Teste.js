"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MinhaAnotacao = "MinhaAnotacao";
function MeuDecorator(nome) {
    return function (target) {
        Reflect.defineMetadata(MinhaAnotacao, nome, target);
    };
}
var MinhaClasse = /** @class */ (function () {
    function MinhaClasse() {
    }
    return MinhaClasse;
}());
function verificaAnotacao(classe) {
    var nomeAnotacao = Reflect.getMetadata(MinhaAnotacao, classe);
    return nomeAnotacao || null;
}
var nomeAnotacao = verificaAnotacao(MinhaClasse);
console.log(nomeAnotacao); // Saída: nomeAnotacao ou null
