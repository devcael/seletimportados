import mysql, { Connection } from 'mysql2/promise';
import { type } from 'node:os';

type MysqlDatabaseProps = {
    host: string;
    user: string;
    port?: number;
    password: string;
    db: string;
}

class MysqlDatabase {
    host: string;
    user: string;
    port?: number;
    password: string;
    db: string;

    constructor(props: MysqlDatabaseProps) {
        this.host = props.host;
        this.user = props.user;
        this.port = props.port ?? 3306;
        this.password = props.password;
        this.db = props.db;
    }



    public async getConnection(): Promise<Connection> {
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            port: this.port,
            password: this.password,
            database: this.db,
        });
    }

}

interface IConnection {
    query(query: string, where: string, whereArgs: string[], limit: number, orderBy: string): any;

    rawQuery(query: string): any;

    insert(): any;

    update(): any;

    delete(): any;
}

enum SqlOrderBy {
    desc = "DESC",
    asc = "ASC"
}

class QConnection {
    private conn: Connection;
    constructor(conn: Connection) {
        this.conn = conn;
    }

    async query(table: string, fields?: string[], where?: string, limit?: number, orderBy?: SqlOrderBy) {

        var whereStr: string = where ?? "";
        var limitStr: string = limit == null ? "" : `LIMIT ${limit}`;
        var orderByStr: string = orderBy == null ? "" : `ORDER BY ${orderBy}`;
        var fieldsStr: string = fields == null ? "" : "";
        var strQuery: string = `SELECT * FROM ${table} ${whereStr} ${orderByStr} ${limitStr};`;

        this.conn.connect();


        var row = this.conn.query(strQuery);

        this.conn.end();

        return row;
    }
}

export type {
    MysqlDatabaseProps,
}

export {
    SqlOrderBy,
    MysqlDatabase,

    QConnection
}




