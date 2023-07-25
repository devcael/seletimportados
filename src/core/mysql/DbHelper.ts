var idPropertie


type DbSerializationType = {
    tableName: string;

}

interface DbSerialization<R, T> {
    toMap(): T;
    fromMap(map: T): R;
}

type UserType = {
    id: number;
    nome: string;
    senha: string;

}


class User implements DbSerialization<User, UserType>{

    id: number;
    nome: string;
    senha: string;

    constructor(type: UserType) {
        this.id = type.id;
        this.nome = type.nome;
        this.senha = type.senha;
    }


    toMap(): UserType {
        return JSON.parse(JSON.stringify(this))
    }

    fromMap(map: UserType): User {
        return new User(map);
    }

}

abstract class DatabaseRepository {
    insert(obj: DbSerialization<any, Object>) {

    }

    save(obj: DbSerialization<any, Object>) {

    }

    saveAll(list: Array<DbSerialization<any, Object>>) {

    }


}

class Repository extends DatabaseRepository {

}

var repo: Repository = new Repository();


var usuario: User = new User({ id: 1, nome: "Micael", senha: "123" });

usuario.toMap();






export default User;


export type {
    UserType,
}


