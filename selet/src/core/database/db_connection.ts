import mysql from 'mysql2/promise';

async function CreateQuery(query: string) {

    try {
        const connection = await mysql.createConnection({
            host: '172.22.64.1',
            user: 'asnweb',
            port: 3306,
            password: 'webasnsoft@',
            database: 'seletimportados',
            connectTimeout: 20000
        });

        const [row] = await connection.execute(query);
        connection.end()

        let transformToObject = row as Object;

        return transformToObject;
    } catch (error) {
        throw Error("Erro ao se conectar com o banco de dados: " + error)
    }
}

export {
    CreateQuery
};
