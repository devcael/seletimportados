"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(type) {
        this.id = type.id;
        this.nome = type.nome;
        this.senha = type.senha;
    }
    User.prototype.toMap = function () {
        return {
            id: this.id,
            nome: this.nome,
            senha: this.senha
        };
    };
    User.prototype.fromMap = function (map) {
        return new User(map);
    };
    return User;
}());
var DatabaseRepository = /** @class */ (function () {
    function DatabaseRepository() {
    }
    DatabaseRepository.prototype.insert = function () {
    };
    return DatabaseRepository;
}());
var Repository = /** @class */ (function (_super) {
    __extends(Repository, _super);
    function Repository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Repository;
}(DatabaseRepository));
var repo = new Repository();
repo.insert();
var usuario = new User({ id: 1, nome: "Micael", senha: "123" });
var userConvertToString = JSON.stringify(usuario);
var userDecoverFromString = JSON.parse(userConvertToString);
console.log(userConvertToString);
console.log(userDecoverFromString);
console.log(typeof userDecoverFromString);
exports.default = User;
