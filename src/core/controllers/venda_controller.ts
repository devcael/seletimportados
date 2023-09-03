import ProdutoModel from '../models/produtos_model';
import VendaModel from '../models/venda_model';
import sequelize from '../settings/database';
import { QueryTypes } from "sequelize";

export interface DadosEstatisticos {
  total_receita: number;
  lucro: number;
  quantidade_vendas: number;
  produto_mais_vendido: string;
}

export interface ProdutoEstatisticas {
  produto_mais_vendido: string;
}


const VendaController = {

  async getVendaById(id: number): Promise<VendaModel | null> {
    return await VendaModel.findByPk(id);
  },

  async findAll(): Promise<VendaModel[] | null> {
    return await sequelize.query('SELECT * FROM venda', {
      model: VendaModel,
      mapToModel: true
    });
  },

  async buscarVendasPaginadas(currPage: number, pageSize: number, search: string, tipo: string | undefined, dataInicial: string | undefined, dataFinal: string | undefined, situacao: string | undefined): Promise<{ vendas: VendaModel[]; totalCount: number, currPage: number }> {

    const offset = currPage * pageSize;

    let tipoFilter: string = tipo ? `AND V.tipo = "${tipo}"` : '';
    let situacaoFilter: string = situacao ? `AND V.situacao = "${situacao}"` : '';

    let dataFilter: string = (dataInicial && dataFinal) ? `AND V.data BETWEEN "${dataInicial}" AND "${dataFinal}"` : '';

    console.log("Data filter: ", dataFilter);


    const vendas = await sequelize.query(`SELECT V.*, C.nome FROM venda AS V LEFT JOIN clientes AS C ON V.id_cliente = C.id WHERE ( C.nome LIKE "%${search}%" OR V.id LIKE "%${search}%" ) ${tipoFilter} ${dataFilter} ${situacaoFilter}  ORDER BY V.id DESC LIMIT ${pageSize} OFFSET ${offset};`, {
      model: VendaModel,
      mapToModel: true
    });


    const totalCount = await VendaModel.count();

    return { vendas, totalCount, currPage };
  },

  async createNewVenda(venda: {
    data: Date;
    hora: string;
    totalvenda: number;
    situacao: string | null;
    id_usuario: number;
    id_cliente: number;
    desconto: number | null;
    acrescimo: number | null;
    subtotal: number;
    totalcomdescontoeacrescimo: number | null;
  }): Promise<VendaModel> {
    return await VendaModel.create(venda);
  }, async obterDadosEstatisticos(dataInicial: string, dataFinal: string): Promise<DadosEstatisticos | null> {
    const result: DadosEstatisticos[] = await sequelize.query(`
      SELECT
      SUM(iv.valortotal * iv.taxa_moeda_preco_produto) AS total_receita,
      SUM(((iv.valortotal * iv.taxa_moeda_preco_produto) - ((iv.custo_produto * iv.quantidade) * iv.taxa_moeda_custo_produto))) AS lucro,
      COUNT(DISTINCT iv.id_venda) AS quantidade_vendas
      FROM
          items_venda AS iv
          INNER JOIN venda AS v ON iv.id_venda = v.id
      WHERE
        v.data BETWEEN "${dataInicial}" AND "${dataFinal}" AND v.tipo = "VENDA"
      ;  
      
    `, {
      type: QueryTypes.SELECT,
    });


    const produtoQuery: ProdutoEstatisticas[] = await sequelize.query(`
    SELECT
    p.nome AS produto_mais_vendido,
    SUM(iv.quantidade) AS quantidade_mais_vendida
      FROM
          produtos AS p
      INNER JOIN items_venda AS iv ON p.id = iv.id_produto
      INNER JOIN venda AS v ON iv.id_venda = v.id
      WHERE
        v.data BETWEEN "${dataInicial}" AND "${dataFinal}" AND v.tipo = "VENDA"
      GROUP BY
          p.id, p.nome
      ORDER BY
          quantidade_mais_vendida DESC
      LIMIT 1;
      
    `, {
      type: QueryTypes.SELECT,
    });


    if (result.length == 0) {
      return null;
    }

    var returnData: DadosEstatisticos = {
      ...result[0],
      produto_mais_vendido: produtoQuery.length > 0 ? produtoQuery[0].produto_mais_vendido : "Não foi possivel definir"
    }

    return returnData;
  },

  async updateVenda(vendaId: number, novosDados: {
    data?: Date;
    hora?: string;
    totalvenda?: number;
    situacao?: string | null;
    tipo?: "VENDA" | "ORÇAMENTO";
    id_usuario?: number;
    id_cliente?: number;
    desconto?: number | null;
    acrescimo?: number | null;
    subtotal?: number;
    totalcomdescontoeacrescimo?: number | null;
  }): Promise<boolean> {
    const [updatedRowsCount] = await VendaModel.update(novosDados, {
      where: { id: vendaId },
    });

    return updatedRowsCount > 0;
  },

  async excluirVenda(vendaId: number): Promise<boolean> {
    const deletedRowsCount = await VendaModel.destroy({
      where: { id: vendaId },
    });

    await sequelize.query(`DELETE FROM items_venda WHERE id_venda = ${vendaId};`);

    await sequelize.query(`DELETE FROM pagamento_venda WHERE id_venda = ${vendaId};`);

    return deletedRowsCount > 0;
  }

}

export default VendaController;