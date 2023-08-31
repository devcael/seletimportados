import StrUtil from "@/domain/services/StrUtils";
import CardResume from "./card-resume";
import styled from "styled-components";
import { useVendaContext } from "@/provider/venda_prodiver";


const ResumeSession = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 35px;
  height: 120px;
  padding: 15px 30px;
      margin: 10px 0px;
`



function ResumeSessionContainer() {

    const { vendaData } = useVendaContext();

    return (<ResumeSession>
        <CardResume icon="fa-solid fa-chart-simple" color="var(--secodary-blue)" label='Receita Total' value={StrUtil.formatadorComSufixoComGarantiaDeDecimal(vendaData.dadosEstatisticos?.total_receita?.toString() ?? "0.00")}></CardResume>
        <CardResume icon="fa-solid fa-chart-line" color="teal" label='Lucro' value={StrUtil.formatadorComSufixoComGarantiaDeDecimal(vendaData.dadosEstatisticos?.lucro?.toString() ?? "0.00")}></CardResume>
        <CardResume icon="fa-regular fa-chart-bar" color="var(--color-primary)" label='Qnt de Vendas' value={vendaData.dadosEstatisticos?.quantidade_vendas?.toString() ?? "0"}></CardResume>
        <CardResume icon="fa-solid fa-boxes-stacked" color="var(--blue-ascent)" label='Produto Mais Vendido' value={vendaData.dadosEstatisticos?.produto_mais_vendido?.toString() ?? "Não foi possivel identificar"}></CardResume>
    </ResumeSession>)
}

export default ResumeSessionContainer;