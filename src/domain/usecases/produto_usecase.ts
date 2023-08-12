import ProdutoModel from "@/core/models/produtos_model";
import { log } from "node:console";

export default class ProdutoUseCase {
    static async getAllProdutos() {
        try {
            let response = await fetch('http://localhost:3000/api/produtos/produtos');

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            let data: Array<object> = await response.json();

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                console.log(element instanceof Produto);

            }

            console.log(typeof data);


        } catch (error) {
            console.log('Ocorreu um erro:', error);
        }

    }
}