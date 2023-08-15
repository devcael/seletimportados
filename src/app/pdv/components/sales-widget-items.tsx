import { BtnAscent } from "@/components/buttons"
import styled from "styled-components"


import { Table, TableData, TableHead, TableHeaderBlue, TableRow } from "@/components/styled-components/table-data-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCriarVendaContext } from "../CriarVenda";
import ItemVenda from "@/domain/models/ItemVenda";
import useGerenciadorVenda, { useGerenciadorVendaContext } from "../GerenciadorDeVendas";
const SalesItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius:  5px;
    background-color: white;
    max-width: 60vw;
    flex-grow: 1;
`

const TableContainer = styled.div`
    flex-grow:  1;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    border: 0px solid var(--gray-color);
    
  &::-webkit-scrollbar {
    display: none;
    width: 0.2rem;
    height: 0.5rem;
  }

    
`

const ResumeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    background-color: white;
    border: 1px solid var(--gray-color);
    border-radius: 10px;
    padding: 10px 20px;
    gap: 10px;
`

const ResumeLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default function SalesWidgetItems() {
    const { listaItems, alterarQuantidadeItem } = useGerenciadorVendaContext();
    const diminuirQuantidade = (index: number, item: ItemVenda) => {
        alterarQuantidadeItem(index, Number(item.quantidade) - 1);
    }

    const aumentarQuantidade = (index: number, item: ItemVenda) => {
        alterarQuantidadeItem(index, Number(item.quantidade) + 1);
    }

    let listOfItems = (): React.ReactNode[] => {
        return listaItems.map((item: ItemVenda, index: number) => (<TableRow key={index} >
            <TableData >{item.produto.nome}</TableData>
            <TableData>{item.quantidade}</TableData>
            <TableData ><strong>{item.preco_produto}</strong></TableData>
            <TableData ><strong>{item.valortotal}</strong></TableData>
            <TableData style={{ display: "flex", gap: "10px", justifyContent: "end" }} >
                <BtnAscent onClick={() => diminuirQuantidade(index, item)} style={{ background: "red", padding: "8px 20px" }} ><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></BtnAscent>
                <BtnAscent onClick={() => aumentarQuantidade(index, item)} style={{ background: "teal", padding: "8px 20px" }} ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></BtnAscent>
            </TableData>
        </TableRow>));
    }

    return (<SalesItemContainer>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow className="title-medium">
                        <TableHeaderBlue scope="col" style={{ flex: 20 }} >Produto</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }} >Quantidade</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }} >Valor Unitario</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }} >Total</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ width: "fit-content" }}></TableHeaderBlue>
                    </TableRow>
                </TableHead>
                {listOfItems()}
            </Table>

        </TableContainer>
        <ResumeContainer>
            <ResumeLabel>
                <h3>SubTotal:</h3>
                <h3><strong>R$200</strong></h3>
            </ResumeLabel>
            <ResumeLabel>
                <h3>Desconto:</h3>
                <h3><strong>R$200</strong></h3>
            </ResumeLabel>
            <ResumeLabel>
                <h3>Acrescimo:</h3>
                <h3><strong>R$200</strong></h3>
            </ResumeLabel>
            <ResumeLabel>
                <h3>TOTAL:</h3>
                <h3><strong>R$200</strong></h3>
            </ResumeLabel>
            <BtnAscent style={{ fontSize: "16px", padding: "10px" }}>Finalizar Venda</BtnAscent>
        </ResumeContainer>
    </SalesItemContainer>)
}
