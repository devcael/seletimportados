import { describe } from "node:test";

describe(() => {
    it("Teste", () => {

        let obj: object = { nome: "Micael" };


        let style: object = { width: "100px", ...obj };

        console.log(style);

    })
})