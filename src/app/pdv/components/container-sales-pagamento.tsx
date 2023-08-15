import { BtnAscent } from "@/components/buttons";
import { SessionRow } from "@/components/modal-components";
import { SimpleDropdown, SimpleInput } from "@/components/simple-input";
import { SimpleDropDownWithLabel } from "@/components/simple-input-with-label";
import { Table, TableData, TableHead, TableHeaderBlue, TableRow } from "@/components/styled-components/table-data-styles";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import '@styles/fonts.css'

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
    return (<ContainerPagamentoAvista >

        <SessionRow>
            <SimpleInput style={{ padding: "15px", flexGrow: "5" }} inputType="text" label="Cliente" />
        </SessionRow>
        <SessionRow>
            <SimpleInput style={{ padding: "15px" }} inputType="text" label="Desconto" />
            <SimpleInput style={{ padding: "15px" }} inputType="text" label="Acrescimo" />
        </SessionRow>
        <SessionRow>
            <SimpleInput style={{ padding: "15px" }} inputType="text" label="Total" />
            <SimpleInput style={{ padding: "15px" }} inputType="text" label="Tipo de Pagamento" />


        </SessionRow>
        <SessionRow>
            <SimpleInput style={{ padding: "15px" }} inputType="text" label="Valor Pago" />
            <SimpleInput style={{ padding: "15px" }} inputType="text" label="Restante" />
            <SimpleInput style={{ padding: "15px" }} inputType="text" label="Troco" />
        </SessionRow>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", flex: 10 }} >Tipo Pagamento</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ background: "black", color: "white", flex: 2 }} >Data Pagamento</TableHeaderBlue>
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
            <SessionRow style={{ padding: "0px 10px" }}>
                <SimpleDropdown
                    style={{ marginTop: "5px", width: "100%" }}
                    label="Tipo de pagamento"
                    onChange={handleTipoPagamento}
                    items={[{ label: "A vista", value: "avista" }, { label: "A prazo", value: "aprazo" }]}
                />
            </SessionRow>
            {tipoPagamento == TipoPagamentoSelected.avista ? <PagamentoAvista /> : <PagamentoAprazo />}


        </Container>);
}
