import { MysqlDatabase, QConnection } from "@/core/database/db_connection";
import { Connection } from "mysql2/promise";
import { describe, it } from "node:test"

const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
describe("Should Do SomeThing", () => {

    // afterAll(async () => {
    //     await sleep(1000);
    // });

    test("Case", async () => {

        var db: MysqlDatabase = new MysqlDatabase({
            host: "172.22.64.1",
            password: "webasnsoft@",
            db: "seletimportados",
            user: "asnweb"
        });

        const r: Connection = await db.getConnection();

        const conn: QConnection = new QConnection(r);

        var result = await conn.query("clientes")


        console.log(result);
    });

});


