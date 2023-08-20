import { BtnAscent } from "@/components/buttons";
import { SessionRow } from "@/components/modal-components";
import { InputWithLabelAndFormatter, SimpleDropdown, SimpleInput } from "@/components/simple-input";
import { SimpleDropDownWithLabel } from "@/components/simple-input-with-label";
import { Table, TableData, TableHead, TableHeaderBlue, TableRow } from "@/components/styled-components/table-data-styles";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import '@styles/fonts.css'
import { useGerenciadorVendaContext } from "../GerenciadorDeVendas";
import TipoPagamento from "@/domain/models/TipoPagamento";
import { useForm } from "react-hook-form";
import AppFormatters from "@/domain/services/Formatters";
import AppUtil from "@/domain/services/Utils";
import StrUtil from "@/domain/services/StrUtils";
import PagamentoVenda from "@/domain/models/PagamentoVenda";
import Clientes from "@/domain/models/Clientes";

const Container = styled.div`
    flex-grow: 1;
    display: inline;
    gap: 8px;
    overflow-y: scroll;
`
const ContainerPagamentoAvista = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0px 10px;
    
`

enum TipoPagamentoSelected {
    avista,
    aprazo
}

const TableContainer = styled.div`
    width: 100%;
    flex-grow:  1;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    margin: 10px 0px;
    border: 1px solid var(--gray-color);
    
  &::-webkit-scrollbar {
    display: none;
    width: 0.2rem;
    height: 0.5rem;
  }

    
`

function PagamentoAvista() {
    const { adicionarItemVenda, currCliente, setCurrCliente, listOfClientes, removerPagamento, calcValorPagoTotal, adicionarPagamento, alterarAcrescimoVenda, alterarDescontoVenda, calcTotalValue, listaPayments, tipoPagamentos } = useGerenciadorVendaContext();


    const [currTipoPagamento, setTipoPagamento] = useState<TipoPagamento>(tipoPagamentos[0]);


    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
        watch
    } = useForm({
        mode: "onBlur",
    })

    function getClienteById(id: number): Clientes | undefined {
        return listOfClientes.find(tipo => tipo.id == id);
    }

    const handleClienteChange = (tipoid: string) => {
        const tipo = getClienteById(Number(tipoid));
        if (tipo) {
            console.log("Cliente Pagamento:", tipo);
            setCurrCliente(tipo);
        }
    }

    function getTipoPagamentoById(id: number): TipoPagamento | undefined {
        return tipoPagamentos.find(tipo => tipo.idtiposdepagamento == id);
    }

    const handleTipoPagamentoChange = (tipoid: string) => {
        const tipo = getTipoPagamentoById(Number(tipoid));
        if (tipo) {
            console.log("Tipo Pagamento:", tipo);
            setTipoPagamento(tipo);
        }
    }

    const [troco, setTroco] = useState(0);
    const [restante, setRestante] = useState(calcTotalValue());
    const [valorPago, setValorPago] = useState(0);
    const watchDesconto = watch('desconto', "0");
    const watchAcrescimo = watch('acrescimo', "0");

    function calcTroco() {
        let calcTroco: number = calcValorPagoTotal() - calcTotalValue();
        if (restante > 0) {
            setTroco(0);
            return;
        }
        setTroco(calcTroco);
    }

    function calcRestante() {

        let restante: number = calcTotalValue() - calcValorPagoTotal();

        if (restante < 0) {
            setRestante(0);
            return;
        }

        setRestante(restante);
    }

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('Valor do input:', currTipoPagamento);


            const pagamento = new PagamentoVenda(
                0,
                0,
                currTipoPagamento.idtiposdepagamento,
                valorPago,
                null,
                currTipoPagamento,
                null,
            );

            adicionarPagamento(pagamento, currTipoPagamento);


        }
    };

    const handlerSetDesconto = (value: string) => {
        alterarDescontoVenda(Number(value));
    };

    const handlerSetAcrescimo = (value: string) => {
        alterarAcrescimoVenda(Number(value));
    }

    const handlerDeletPagamento = (value: number) => {
        removerPagamento(value);
    }

    const listOfClientesDropDown = listOfClientes.map((cliente: Clientes) => { return { label: cliente.nome, value: cliente.id.toString() } });

    const listOfTypesDropDown = tipoPagamentos.map((tipo: TipoPagamento) => { return { label: tipo.nome_tipo, value: tipo.idtiposdepagamento.toString() } });
    useEffect(() => {
        setCurrCliente(listOfClientes[0])
    }, []);
    useEffect(() => {
        console.log("UseEffect!");

        handlerSetAcrescimo(watchAcrescimo);
        handlerSetDesconto(watchDesconto);
        setValue("total", StrUtil.formatadorComSufixoComGarantiaDeDecimal(calcTotalValue().toString()));
        setValue("restante", StrUtil.formatadorComSufixoComGarantiaDeDecimal(restante.toString()));
        setValue("troco", StrUtil.formatadorComSufixoComGarantiaDeDecimal(troco.toString()));
        setValue("desconto", watchDesconto);
        setValue("acrescimo", watchAcrescimo);
        calcRestante();
        calcTroco();
    }, [listaPayments, currCliente, calcValorPagoTotal, valorPago, restante, troco, watchDesconto, watchAcrescimo, calcTotalValue]);

    let listOfPayments = (): React.ReactNode[] => {
        return listaPayments.map((pagamento: PagamentoVenda, index: number) => {
            return <TableRow key={index} >
                <TableData >{pagamento.tipo_pagamento?.nome_tipo}</TableData>
                <TableData ><strong>{StrUtil.formatadorComSufixoComGarantiaDeDecimal(pagamento.valorpago.toString())}</strong></TableData>
                <TableData style={{ display: "flex", justifyContent: "end" }} >
                    <BtnAscent onClick={() => handlerDeletPagamento(index)} style={{ background: "red" }} >Remover</BtnAscent></TableData>
            </TableRow>
        });
    }

    return (<ContainerPagamentoAvista >

        <SessionRow>

            <SimpleDropdown
                style={{ marginTop: "5px", width: "100%" }}
                label="Selecione o Cliente"
                onChange={(e) => handleClienteChange(e)}
                items={listOfClientesDropDown}
            />
        </SessionRow>
        <SessionRow>
            <SimpleInput register={register("desconto")} inputType="number" label="Desconto (%)" />
            <SimpleInput register={register("acrescimo")} inputType="number" label="Acrescimo (%)" />
        </SessionRow>
        <SessionRow>

            <SimpleDropdown
                style={{ marginTop: "5px", width: "100%" }}
                label="Modalidade De Pagamento"
                onChange={(e) => handleTipoPagamentoChange(e)}
                items={listOfTypesDropDown}
            />
        </SessionRow>
        <SessionRow>
            <SimpleInput readonly={true} inputType="text" label="Total" register={register("total")} />
            <SimpleInput readonly={true} register={register("restante")} inputType="text" label="Restante" />
        </SessionRow>
        <SessionRow>
            <InputWithLabelAndFormatter
                formatterFunction={(value) => AppFormatters.formatador(value)}
                onChange={(event) => setValorPago(AppUtil.formatRealToDouble(event) ?? 0.00)}
                defaultValue={""}
                onKeyDown={handleInputKeyDown} inputType="text" label="Valor Pago" />
            <SimpleInput readonly={true} inputType="text" label="Troco" register={register("troco")} />
        </SessionRow>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", flex: 10 }} >Tipo Pagamento</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", flex: 2 }} >Valor Pago</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", width: "fit-content" }}></TableHeaderBlue>
                    </TableRow>
                </TableHead>
                {listOfPayments()}
            </Table>

        </TableContainer>

    </ContainerPagamentoAvista>);

}
function PagamentoAprazo() {
    return (<ContainerPagamentoAvista >

        <SessionRow>
            <SimpleInput style={{ flexGrow: "5" }} inputType="text" label="Cliente" />
        </SessionRow>
        <SessionRow>
            <SimpleInput inputType="text" label="Desconto" />
            <SimpleInput inputType="text" label="Acrescimo" />
        </SessionRow>
        <SessionRow>

            <SimpleInput inputType="text" label="Total" />
            <SimpleInput inputType="text" label="Tipo de Pagamento" />

        </SessionRow>
        <SessionRow>
            <SimpleInput inputType="text" label="Qnt. Parcelas" />
            <SimpleInput inputType="text" label="1° Parcela" />
        </SessionRow>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", flex: 10 }} ><p>Tipo Pagamento</p></TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", flex: 2 }} ><p>Data Pagamento</p></TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", flex: 2 }} >Valor Pago</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", width: "fit-content" }}></TableHeaderBlue>
                    </TableRow>
                </TableHead>
                <TableRow >
                    <TableData >DINHEIRO</TableData>
                    <TableData>14/08/2023</TableData>
                    <TableData ><strong>R$200,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} >
                        <BtnAscent style={{ background: "red" }} >Remover</BtnAscent></TableData>
                </TableRow>

                <TableRow >
                    <TableData >DINHEIRO</TableData>
                    <TableData>14/08/2023</TableData>
                    <TableData ><strong>R$200,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} >
                        <BtnAscent style={{ background: "red" }} >Remover</BtnAscent></TableData>
                </TableRow>

                <TableRow >
                    <TableData >DINHEIRO</TableData>
                    <TableData>14/08/2023</TableData>
                    <TableData ><strong>R$200,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} >
                        <BtnAscent style={{ background: "red" }} >Remover</BtnAscent></TableData>
                </TableRow>

                <TableRow >
                    <TableData >DINHEIRO</TableData>
                    <TableData>14/08/2023</TableData>
                    <TableData ><strong>R$200,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} >
                        <BtnAscent style={{ background: "red" }} >Remover</BtnAscent></TableData>
                </TableRow>
            </Table>

        </TableContainer>

    </ContainerPagamentoAvista>);

}


export default function ContainerPagamento() {
    const [tipoPagamento, setTipoPagamento] = useState<TipoPagamentoSelected>(TipoPagamentoSelected.avista);

    useEffect(() => { }, [tipoPagamento]);


    function handleTipoPagamento(value: string) {
        if (value == "avista") {
            setTipoPagamento(TipoPagamentoSelected.avista);
        } else {
            setTipoPagamento(TipoPagamentoSelected.aprazo);
        }


    }
    return (
        <Container>
            {/*   <SessionRow style={{ padding: "0px 10px" }}>
                <SimpleDropdown
                    style={{ marginTop: "5px", width: "100%" }}
                    label="Tipo de pagamento"
                    onChange={handleTipoPagamento}
                    items={[{ label: "A vista", value: "avista" }, { label: "A prazo", value: "aprazo" }]}
                />
            </SessionRow> */}
            {/*    {tipoPagamento == TipoPagamentoSelected.avista ? <PagamentoAvista /> : <PagamentoAprazo />} */}
            <PagamentoAvista />

        </Container>);
}
