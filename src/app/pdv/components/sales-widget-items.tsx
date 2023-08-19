import { BtnAscent, BtnWithBorder } from "@/components/buttons"
import styled from "styled-components"


import { Table, TableData, TableHead, TableHeaderBlue, TableRow } from "@/components/styled-components/table-data-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCriarVendaContext } from "../CriarVenda";
import ItemVenda from "@/domain/models/ItemVenda";
import useGerenciadorVenda, { useGerenciadorVendaContext } from "../GerenciadorDeVendas";
import { SessionRow } from "@/components/modal-components";
import AppFormatters from "@/domain/services/Formatters";
import { useEffect, useState } from "react";
import AppUtil from "@/domain/services/Utils";
import StrUtil from "@/domain/services/StrUtils";
import CabecalhoVenda from "@/domain/models/CabecalhoVenda";
import VendaUseCase from "@/domain/usecases/venda_usecase";
import ItemVendaUseCase from "@/domain/usecases/items_venda_usecase";
import PagamentoVendaUseCase from "@/domain/usecases/PagamentoVenda_usecase";
import { useRouter } from 'next/navigation';
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

    const router = useRouter();
    const { listaItems, currCliente, listaPayments, calcValorPagoTotal, calcTotalValue, removerItemPorIndex, calcSubTotalValue, desconto, acrescimo, alterarQuantidadeItem } = useGerenciadorVendaContext();
    const diminuirQuantidade = (index: number, item: ItemVenda) => {
        if (Number(item.quantidade) > 1) {
            alterarQuantidadeItem(index, Number(item.quantidade) - 1);
        }
    }

    const aumentarQuantidade = (index: number, item: ItemVenda) => {
        alterarQuantidadeItem(index, Number(item.quantidade) + 1);
    }

    const deletarItem = (index: number) => {
        removerItemPorIndex(index);
    }

    const [canFinish, setCanFinish] = useState(false);


    function handleCanFinish() {

        if (listaItems.length == 0) {
            setCanFinish(false);
            return;
        }

        let restante: number = calcTotalValue() - calcValorPagoTotal();

        if (restante < 0) {
            setCanFinish(true);
            return;
        }

        setCanFinish(false);
    }

    useEffect(() => {
        handleCanFinish();
    }, [listaItems, currCliente, calcTotalValue, listaPayments, desconto, calcSubTotalValue, acrescimo, calcValorPagoTotal]);


    const handlerFinalizarVenda = async () => {
        if (!canFinish) {
            return;
        }

        const cabecalhoVenda = new CabecalhoVenda(
            1,
            StrUtil.getCurrentFormattedDate(),
            StrUtil.getCurrentFormattedTime(),
            calcTotalValue(),
            'FINALIZADA',
            1,
            currCliente?.id ?? 1,
            desconto,
            acrescimo,
            calcSubTotalValue(),
            calcTotalValue(),
            'VENDA',
            'Cliente XPTO'
        );

        try {
            let newVenda: CabecalhoVenda = await VendaUseCase.createVenda(cabecalhoVenda);

            for (let index = 0; index < listaItems.length; index++) {
                const currItem: ItemVenda = listaItems[index];
                console.log("Criando item de venda", currItem)

                currItem.setIdVenda(newVenda.id);
                currItem.valortotal = currItem.getValorTotalConvertido();
                await ItemVendaUseCase.enviarItemVenda(currItem);

            }

            for (let index = 0; index < listaPayments.length; index++) {
                const currPagamento = listaPayments[index];

                currPagamento.setIdVenda(newVenda.id);

                await PagamentoVendaUseCase.createPagamentoVenda(currPagamento);

            }

            console.log("nova venda criada", newVenda);

        } catch (error) {
            console.log("erro ao criar venda", error);
            return;
        }

        router.replace("/dashboard");

    }
    const handlerGerarOrcamento = async () => {


        if (!canFinish) {
            return;
        }

        const cabecalhoVenda = new CabecalhoVenda(
            1,
            StrUtil.getCurrentFormattedDate(),
            StrUtil.getCurrentFormattedTime(),
            calcTotalValue(),
            'FINALIZADA',
            1,
            currCliente?.id ?? 1,
            desconto,
            acrescimo,
            calcSubTotalValue(),
            calcTotalValue(),
            'ORCAMENTO',
            'Cliente XPTO'
        );

        try {
            let newVenda: CabecalhoVenda = await VendaUseCase.createVenda(cabecalhoVenda);

            for (let index = 0; index < listaItems.length; index++) {
                const currItem: ItemVenda = listaItems[index];
                console.log("Criando item de venda", currItem)

                currItem.setIdVenda(newVenda.id);
                await ItemVendaUseCase.enviarItemVenda(currItem);

            }

            for (let index = 0; index < listaPayments.length; index++) {
                const currPagamento = listaPayments[index];

                currPagamento.setIdVenda(newVenda.id);

                await PagamentoVendaUseCase.createPagamentoVenda(currPagamento);

            }

            console.log("nova venda criada", newVenda);

        } catch (error) {
            console.log("erro ao criar venda", error);
            return;
        }
        router.replace("/dashboard");

    }



    let listOfItems = (): React.ReactNode[] => {
        return listaItems.map((item: ItemVenda, index: number) => (<TableRow key={index} >
            <TableData >{item.produto.nome}</TableData>
            <TableData>{item.quantidade}</TableData>
            <TableData ><strong>{StrUtil.formatadorComSufixoComGarantiaDeDecimal(item.getPrecoConvertido().toString())}</strong></TableData>
            <TableData ><strong>{StrUtil.formatadorComSufixoComGarantiaDeDecimal(item.getValorTotalConvertido().toString())}</strong></TableData>
            <TableData style={{ display: "flex", gap: "10px", justifyContent: "end" }} >
                <BtnAscent onClick={() => diminuirQuantidade(index, item)} style={{ background: "red", padding: "8px 20px" }} ><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></BtnAscent>
                <BtnAscent onClick={() => aumentarQuantidade(index, item)} style={{ background: "teal", padding: "8px 20px" }} ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></BtnAscent>
                <BtnAscent onClick={() => deletarItem(index)} style={{ background: "red", padding: "8px 20px" }} ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></BtnAscent>
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
                <h3><strong>{StrUtil.formatadorComSufixoComGarantiaDeDecimal(calcSubTotalValue().toString())}</strong></h3>
            </ResumeLabel>
            <ResumeLabel>
                <h3>Desconto:</h3>
                <h3><strong>{StrUtil.formatadorComSufixoComGarantiaDeDecimal(desconto.toString())}</strong></h3>
            </ResumeLabel>
            <ResumeLabel>
                <h3>Acrescimo:</h3>
                <h3><strong>{StrUtil.formatadorComSufixoComGarantiaDeDecimal(acrescimo.toString())}</strong></h3>
            </ResumeLabel>
            <ResumeLabel>
                <h3>Total:</h3>
                <h3><strong>{StrUtil.formatadorComSufixoComGarantiaDeDecimal(calcTotalValue().toString())}</strong></h3>
            </ResumeLabel>
            <SessionRow>
                <BtnWithBorder onClick={async () => await handlerGerarOrcamento()} style={{ flexGrow: "1", background: canFinish ? "white" : "gray", color: canFinish ? "var(--blue-ascent)" : "white", borderColor: canFinish ? "var(--blue-ascent)" : "gray", fontSize: "16px", padding: "10px" }}>Gerar Orçamento</BtnWithBorder>
                <BtnAscent onClick={async () => await handlerFinalizarVenda()} style={{ flexGrow: "3", background: canFinish ? "var(--blue-ascent)" : "gray", color: canFinish ? "white" : "white", fontSize: "16px", padding: "10px" }}>Finalizar Venda</BtnAscent>
            </SessionRow>
        </ResumeContainer>
    </SalesItemContainer>)
}
