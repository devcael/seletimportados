import ProdutoUseCase from "@/domain/usecases/produto_usecase";
import { describe } from "node:test";

describe(() => {
    it("Teste", async () => {
        await ProdutoUseCase.getAllProdutos();

    })
})